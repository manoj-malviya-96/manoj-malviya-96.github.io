const maxLineWidth = 3;

class LatticeMesh {
  constructor(cellSize, meshWidth, meshHeight, latticeType) {
    this.cellSize = cellSize;
    this.meshWidth = meshWidth;
    this.meshHeight = meshHeight;
    this.latticeType = latticeType;

    this.points = [];
    this.connections = [];
    this.normThickness = [];
    this.fixedPoints = new Set();
    this.forcePoints = new Set();

    this.generateMeshData();
  }

  readyForOptimize() {
    return (
      this.fixedPoints.size > 0 &&
      this.forcePoints.size > 0 &&
      this.points.length > 0 &&
      this.connections.length > 0
    );
  }

  generateMeshData() {
    const n_nodes_x = Math.floor(this.meshWidth / this.cellSize);
    const n_nodes_z = Math.floor(this.meshHeight / this.cellSize);

    // Generate points
    for (let z = 0; z <= n_nodes_z; z++) {
      for (let x = 0; x <= n_nodes_x; x++) {
        this.points.push([x * this.cellSize, z * this.cellSize]); // Coordinates in mm
      }
    }

    // Generate connections based on lattice type
    for (let i = 0; i < n_nodes_z; i++) {
      for (let j = 0; j < n_nodes_x; j++) {
        const n1 = i * (n_nodes_x + 1) + j;
        const n2 = n1 + 1;
        const n3 = n1 + (n_nodes_x + 1);
        const n4 = n3 + 1;

        if (this.latticeType === "square") {
          this.addConnection(n1, n3);
          this.addConnection(n2, n4);
          this.addConnection(n3, n4);
        } else if (this.latticeType === "checkerboard") {
          if ((i + j) % 2 === 0) {
            this.addConnection(n1, n4); // Cross-diagonal line
          } else {
            this.addConnection(n2, n3); // Opposite-diagonal line
          }
          this.addConnection(n1, n3);
          this.addConnection(n2, n4);
          this.addConnection(n3, n4);
        }
      }
    }
  }

  addConnection(start, end) {
    this.connections.push([start, end]);
    this.normThickness.push(1); // Default line width
  }

  findClosestNode(x, y) {
    let minDist = Infinity;
    let closestNode = -1;
    this.points.forEach((point, index) => {
      const dist = Math.hypot(point[0] - x, point[1] - y);
      if (dist < minDist) {
        minDist = dist;
        closestNode = index;
      }
    });
    return closestNode;
  }

  updateFixNode(x, y) {
    const closestNode = this.findClosestNode(x, y);
    if (closestNode === -1) {
      console.error("No closest node found");
      return;
    }
    if (this.fixedPoints.has(closestNode)) {
      this.fixedPoints.delete(closestNode);
    } else {
      this.fixedPoints.add(closestNode);
    }
  }

  updateForceNode(x, y) {
    const closestNode = this.findClosestNode(x, y);
    if (closestNode === -1) {
      console.error("No closest node found");
      return;
    }
    if (this.forcePoints.has(closestNode)) {
      this.forcePoints.delete(closestNode);
    } else {
      this.forcePoints.add(closestNode);
    }
  }
}

// Drawer Class to interact with HTML and draw the Mesh using Plotly
class LatticeDrawer {
  constructor(mesh) {
    this.mesh = mesh;
  }

  plot(container, heightMargin = 0, callback = null) {
    const coords = this.mesh.points;
    const connections = this.mesh.connections;
    const normThickness = this.mesh.normThickness;

    const lines = {
      x: [],
      y: [],
      mode: "lines",
      type: "scatter",
      line: { color: getContrastColor(), width: [] },
    };

    // Add lines for connections with specified widths
    connections.forEach(([start, end], index) => {
      lines.x.push(coords[start][0], coords[end][0], null);
      lines.y.push(coords[start][1], coords[end][1], null);
      // Assign variable widths based on the input widths
      lines.line.width.push(
        maxLineWidth * normThickness[index % normThickness.length],
      );
    });

    const hoverTemplate = "(%{x}, %{y}) <extra></extra>";
    const markerSize = 7;

    // Plot using Plotly
    const data = [
      lines,
      {
        x: coords.map((coord) => coord[0]),
        y: coords.map((coord) => coord[1]),
        mode: "markers",
        type: "scatter",
        marker: { color: getContrastColor(), size: markerSize },
        hovertemplate: hoverTemplate,
      },
      {
        x: Array.from(this.mesh.fixedPoints).map((index) => coords[index][0]),
        y: Array.from(this.mesh.fixedPoints).map((index) => coords[index][1]),
        mode: "markers",
        type: "scatter",
        marker: { symbol: "x", color: "blue", size: 2 * markerSize },
        hovertemplate: hoverTemplate,
      },
      {
        x: Array.from(this.mesh.forcePoints).map((index) => coords[index][0]),
        y: Array.from(this.mesh.forcePoints).map((index) => coords[index][1]),
        mode: "markers",
        type: "scatter",
        marker: {
          symbol: "triangle-up",
          color: "red",
          size: 2 * markerSize,
        },
        hovertemplate: hoverTemplate,
      },
    ];
    const aspectRatio = this.mesh.meshWidth / this.mesh.meshHeight;
    const height = appWindowHeight - heightMargin;
    const layout = createLayout(
      "",
      height,
      height * aspectRatio,
      "",
      "",
      false,
    );
    Plotly.newPlot(container, data, layout).then(() => {
      callback?.();
    });
  }
}

const MouseMode = {
  Normal: 0,
  Fix: 1,
  Force: 2,
};

class LatticeFEA {
  constructor(mesh) {
    this.mesh = mesh;
    this.ndof_per_node = 3; // 3 DOF per node: x, y, and rotation
    // Initialize K as an ndof x ndof 2D array
    this.ndof = this.mesh.points.length * this.ndof_per_node; // 3 DOF per node: x, y, and rotation
    this.K = Array.from({ length: this.ndof }, () => Array(this.ndof).fill(0));
    this.U = new Array(this.ndof).fill(0);
  }

  computeStiffnessMatrix() {
    const points = this.mesh.points;

    // Initialize global stiffness matrix with zeros
    this.K = Array.from({ length: this.ndof }, () => Array(this.ndof).fill(0));

    this.mesh.connections.forEach(([start, end], index) => {
      const x1 = points[start][0];
      const y1 = points[start][1];
      const x2 = points[end][0];
      const y2 = points[end][1];

      const length = Math.hypot(x2 - x1, y2 - y1);
      const A = this.mesh.normThickness[index];
      const k = A / length;

      // Calculate direction cosines
      const c = (x2 - x1) / length;
      const s = (y2 - y1) / length;

      // Local stiffness matrix for a 2D beam with 3 DOF per node
      const ke = [
        [c * c * k, c * s * k, 0, -c * c * k, -c * s * k, 0],
        [c * s * k, s * s * k, 0, -c * s * k, -s * s * k, 0],
        [0, 0, 0, 0, 0, 0], // Placeholder for rotational DOF (simplified)
        [-c * c * k, -c * s * k, 0, c * c * k, c * s * k, 0],
        [-c * s * k, -s * s * k, 0, c * s * k, s * s * k, 0],
        [0, 0, 0, 0, 0, 0], // Placeholder for rotational DOF (simplified)
      ];

      // Map local stiffness matrix into global stiffness matrix
      const start_dof = start * this.ndof_per_node;
      const end_dof = end * this.ndof_per_node;

      for (let i = 0; i < this.ndof_per_node; i++) {
        for (let j = 0; j < this.ndof_per_node; j++) {
          this.K[start_dof + i][start_dof + j] += ke[i][j];
          this.K[start_dof + i][end_dof + j] += ke[i][j + 3];
          this.K[end_dof + i][start_dof + j] += ke[i + 3][j];
          this.K[end_dof + i][end_dof + j] += ke[i + 3][j + 3];
        }
      }
    });
  }

  computeDisplacement() {
    if (!this.K) {
      console.error("Stiffness matrix not computed");
      return;
    }

    // Apply boundary conditions (fixed points)
    this.mesh.fixedPoints.forEach((index) => {
      const start_dof = index * this.ndof_per_node;
      for (let i = 0; i < this.ndof_per_node; i++) {
        this.K[start_dof + i].fill(0);
        this.K[start_dof + i][start_dof + i] = 1;
      }
    });

    // Initialize force vector
    const F = new Array(this.mesh.points.length * this.ndof_per_beam).fill(0);
    this.mesh.forcePoints.forEach((index) => {
      F[index * this.ndof_per_node] = 1; // Applying force in x direction as an example
    });

    // Solve for displacements
    try {
      this.U = numeric.solve(this.K, F);
    } catch (e) {
      console.error("Matrix is singular or has no unique solution:", e);
    }
  }

  computeStrainEnergy() {
    if (!this.U) {
      console.error("Displacement not computed");
      return;
    }
    const U = this.U;
    const K = this.K;
    return numeric.dot(numeric.dot(U, K), U) / 2;
  }
}

class LatticeOptimizer {
  constructor(initialMesh) {
    this.initialMesh = initialMesh;
    this.currentMesh = { ...initialMesh };
    this.currentLambda = 1; // Initial Lagrange multiplier
    this.maxIterations = 100; // Maximum number of iterations
    this.learningRate = 0.01; // Learning rate for the optimization
    this.lambda = 1;
  }

  computeCost() {
    const fea = new LatticeFEA(this.currentMesh);
    fea.computeStiffnessMatrix();
    fea.computeDisplacement();
    return fea.computeStrainEnergy();
  }

  computeConstraint() {
    return (
      this.currentMesh.normThickness.reduce((acc, val) => acc + val, 0) - 0.3
    );
  }

  // Numerical gradient computation
  computeGradient() {
    const grad = [];
    const delta = 1e-6; // Small perturbation for numerical gradient
    const baseCost = this.computeCost(this.currentMesh);

    this.currentMesh.normThickness.forEach((thickness, i) => {
      this.currentMesh.normThickness[i] += delta; // Perturb thickness
      const newCost = this.computeCost(this.currentMesh);
      grad[i] = (newCost - baseCost) / delta; // Compute gradient
      this.currentMesh.normThickness[i] -= delta; // Reset thickness
    });

    return grad;
  }

  async optimize(progressCallback = null) {
    for (let iteration = 0; iteration < this.maxIterations; iteration++) {
      const grad = this.computeGradient();
      const constraint = this.computeConstraint();

      // Update thicknesses with gradient descent and constraint handling
      this.currentMesh.normThickness = this.currentMesh.normThickness.map(
        (thickness, i) => {
          return (
            thickness -
            this.learningRate * (grad[i] + this.currentLambda * constraint)
          );
        },
      );

      // Update Lagrange multiplier for constraint satisfaction
      this.currentLambda += this.learningRate * constraint;

      // Update the progress bar using the callback
      if (progressCallback) progressCallback(iteration / this.maxIterations);

      // Check convergence (when gradient and constraint are near zero)
      if (
        Math.abs(constraint) < 1e-4 &&
        grad.every((g) => Math.abs(g) < 1e-4)
      ) {
        console.log("Convergence achieved at iteration", iteration);
        break;
      }
    }

    console.log(
      "Optimization complete. Final thickness values:",
      this.currentMesh.normThickness,
    );
  }
}

// Viewer Class to handle HTML interactions and manage Mesh and Drawer
class LatticeViewer {
  constructor() {
    this.canvasId = "meshPlot";

    this.cellSizeInput = document.getElementById("cellSize");
    this.meshWidthInput = document.getElementById("meshWidth");
    this.meshHeightInput = document.getElementById("meshHeight");
    this.fixedNodeBtn = document.getElementById("selectFixedButton");
    this.forceNodeBtn = document.getElementById("selectForceButton");
    this.optimizeBtn = document.getElementById("optimizeButton");
    this.progressBar = document.getElementById("progressBar");
    this.infoTable = document.getElementById("infoTable");

    this.latticeType = "square";
    setupAllSpinBoxsWithOneCallback(this.onSpinboxChange.bind(this));
    setupDropdown(
      document.getElementById("latticeTypeDropdown"),
      this.onLatticeTypeChanged.bind(this),
    );

    this.mouseClickMode = MouseMode.Normal;

    this.fixedNodeBtn.addEventListener("click", () => {
      togglePrimaryButton(this.fixedNodeBtn);
      if (isPrimaryButtonSelected(this.fixedNodeBtn)) {
        this.mouseClickMode = MouseMode.Fix;
      } else {
        this.mouseClickMode = MouseMode.Normal;
      }
    });

    this.forceNodeBtn.addEventListener("click", () => {
      togglePrimaryButton(this.forceNodeBtn);
      if (isPrimaryButtonSelected(this.forceNodeBtn)) {
        this.mouseClickMode = MouseMode.Force;
      } else {
        this.mouseClickMode = MouseMode.Normal;
      }
    });

    this.optimizeBtn.addEventListener("click", async () => {
      await this.optimize();
    });

    // Generate initial mesh
    this.updateMesh();
    this.visualizeMesh();
  }

  async optimize() {
    this.progressBar.classList.remove("hidden");

    const optimizer = new LatticeOptimizer(this.mesh);

    // Update the progress bar during optimization
    const updateProgress = (progress) => {
      this.progressBar.value = progress * 100;
    };

    await optimizer.optimize(updateProgress);
    this.mesh.normThickness = optimizer.currentMesh.normThickness;
    this.visualizeMesh();

    this.progressBar.classList.add("hidden");
  }

  onLatticeTypeChanged(newValue) {
    this.latticeType = newValue;
    this.updateMesh();
    this.visualizeMesh();
  }

  onSpinboxChange() {
    this.updateMesh();
    this.visualizeMesh();
  }

  initMouseClickInteraction() {
    const element = window.document.getElementById(this.canvasId);
    if (!element) {
      console.error("Element not found");
      return;
    }
    // Use an arrow function to keep the correct 'this' context
    element.on("plotly_click", (data) => {
      const clickedNodeX = data.points[0].x;
      const clickedNodeY = data.points[0].y;

      // Now 'this' correctly refers to the class instance
      switch (this.mouseClickMode) {
        case MouseMode.Normal:
          break;
        case MouseMode.Fix:
          this.mesh.updateFixNode(clickedNodeX, clickedNodeY);
          break;
        case MouseMode.Force:
          this.mesh.updateForceNode(clickedNodeX, clickedNodeY);
          break;
        default:
          console.error("Invalid mode");
      }
      this.visualizeMesh();
    });
  }

  updateMesh() {
    // Get input values
    const cellSize = parseFloat(this.cellSizeInput.value);
    const meshWidth = parseFloat(this.meshWidthInput.value);
    const meshHeight = parseFloat(this.meshHeightInput.value);

    // Create Mesh object
    this.mesh = new LatticeMesh(
      cellSize,
      meshWidth,
      meshHeight,
      this.latticeType,
    );
    this.drawer = new LatticeDrawer(this.mesh);
  }

  visualizeMesh() {
    const container = window.document.querySelector(
      ".app-controller-container",
    );
    if (!container) {
      console.error("Container not found");
      return;
    }
    const plotFn = () => {
      this.drawer.plot(
        this.canvasId,
        container.clientHeight,
        this.initMouseClickInteraction.bind(this),
      );
    };
    updatePlotHandler([plotFn]);

    this.updateTable();
    this.optimizeBtn.disabled = !this.mesh.readyForOptimize();
  }

  updateTable() {
    this.infoTable.innerHTML = ""; // Clear the table
    addKeyValueToTable(this.infoTable, "Total Thickness", 0.3);
    addKeyValueToTable(this.infoTable, "Total Strain Energy", 0);
  }
}
