const maxLineWidth = 3;
const MouseMode = {
  Normal: 0,
  Fix: 1,
  Force: 2,
};

const stressTopColor = `rgb(189, 92, 92)`;
const stressBottomColor = `rgb(46, 108, 189)`;
const fixedNodeColor = `rgb(188, 232, 140)`;
const forceNodeColor = `rgb(128, 9, 255)`;

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
    this.computeLengthAndDirectionCosines();
  }

  addCantileverCase() {
    // Add Left most edge as fixed points
    const n_nodes_x = Math.floor(this.meshWidth / this.cellSize);
    const n_nodes_z = Math.floor(this.meshHeight / this.cellSize);
    for (let i = 0; i <= n_nodes_z; i++) {
      this.fixedPoints.add(i * (n_nodes_x + 1));
    }

    // Add Right and bottom most corner as force points
    this.forcePoints.add(n_nodes_x);
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

        if (this.latticeType === "cross") {
          this.addConnection(n1, n4);
          this.addConnection(n2, n3);
        } else if (this.latticeType === "checkerboard") {
          if ((i + j) % 2 === 0) {
            this.addConnection(n1, n4); // Cross-diagonal line
          } else {
            this.addConnection(n2, n3); // Opposite-diagonal line
          }
        }
        this.addConnection(n1, n3);
        this.addConnection(n1, n2);
        this.addConnection(n2, n4);
        this.addConnection(n3, n4);
      }
    }
  }

  computeLengthAndDirectionCosines() {
    this.lengths = new Array(this.connections.length).fill(0);
    this.directionCosines = new Array(this.connections.length).fill([0, 0]);

    const points = this.points;
    this.connections.forEach(([start, end], index) => {
      const x1 = points[start][0];
      const y1 = points[start][1];
      const x2 = points[end][0];
      const y2 = points[end][1];

      const length = Math.hypot(x2 - x1, y2 - y1);

      // Calculate direction cosines
      const c = (x2 - x1) / length;
      const s = (y2 - y1) / length;

      this.lengths[index] = length;
      this.directionCosines[index] = [c, s];
    });
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

  computeDisplacedPoints(displacements, ndof_per_node = 2, scale = 0.01) {
    return this.points.map(([x, y], index) => {
      const start_dof = index * ndof_per_node;
      return [
        x + scale * displacements[start_dof],
        y + scale * displacements[start_dof + 1],
      ];
    });
  }
}

class LatticeFEA {
  constructor(mesh) {
    this.mesh = mesh;
    this.ndof_per_node = 2; // 2 DOF per node: x and y (no rotation)
    this.ndof = this.mesh.points.length * this.ndof_per_node; // Total degrees of freedom

    // Initialize global stiffness matrix K as an ndof x ndof 2D array
    this.stiffnessMatrix = null;
    this.displacements = null;
    this.stresses = null;
  }

  computeStiffnessMatrix() {
    // Initialize global stiffness matrix with zeros
    const K = Array.from({ length: this.ndof }, () => Array(this.ndof).fill(0));

    this.mesh.connections.forEach(([start, end], index) => {
      const length = this.mesh.lengths[index];
      const A = this.mesh.normThickness[index];
      const k = A / length;

      // Calculate direction cosines
      const c = this.mesh.directionCosines[index][0];
      const s = this.mesh.directionCosines[index][1];

      // Local stiffness matrix for a 2D beam with 2 DOF per node (no rotation)
      const ke = [
        [c * c * k, c * s * k, -c * c * k, -c * s * k],
        [c * s * k, s * s * k, -c * s * k, -s * s * k],
        [-c * c * k, -c * s * k, c * c * k, c * s * k],
        [-c * s * k, -s * s * k, c * s * k, s * s * k],
      ];

      // Map local stiffness matrix into global stiffness matrix
      const start_dof = start * this.ndof_per_node;
      const end_dof = end * this.ndof_per_node;

      for (let i = 0; i < this.ndof_per_node; i++) {
        for (let j = 0; j < this.ndof_per_node; j++) {
          K[start_dof + i][start_dof + j] += ke[i][j];
          K[start_dof + i][end_dof + j] += ke[i][j + 2];
          K[end_dof + i][start_dof + j] += ke[i + 2][j];
          K[end_dof + i][end_dof + j] += ke[i + 2][j + 2];
        }
      }
    });
    this.stiffnessMatrix = K;
  }

  computeDisplacement() {
    if (!this.stiffnessMatrix) {
      console.error("Stiffness matrix not computed");
      return;
    }

    const K = this.stiffnessMatrix;

    // Apply boundary conditions (fixed points)
    this.mesh.fixedPoints.forEach((index) => {
      const start_dof = index * this.ndof_per_node;
      for (let i = 0; i < this.ndof_per_node; i++) {
        K[start_dof + i].fill(0);
        K[start_dof + i][start_dof + i] = 1;
      }
    });

    // Initialize force vector
    const F = new Array(this.mesh.points.length * this.ndof_per_node).fill(0);
    this.mesh.forcePoints.forEach((index) => {
      F[index * this.ndof_per_node + 1] = 1; // Applying force in x direction as an example
    });

    // Solve for displacements
    try {
      this.displacements = numeric.solve(K, F);
    } catch (e) {
      console.error("Matrix is singular or has no unique solution:", e);
    }
  }

  computeStress() {
    const U = this.displacements;
    const A = this.mesh.normThickness;
    const result = new Array(this.mesh.connections.length).fill(0);

    // Initialize stress array
    //! F = K * U. Stress = A * (U2 - U1) / L
    for (let i = 0; i < this.mesh.connections.length; i++) {
      const length = this.mesh.lengths[i];
      const c = this.mesh.directionCosines[i][0];
      const s = this.mesh.directionCosines[i][1];

      const [start, end] = this.mesh.connections[i];
      const start_dof = start * this.ndof_per_node;
      const end_dof = end * this.ndof_per_node;

      const u1 = [U[start_dof], U[start_dof + 1]];
      const u2 = [U[end_dof], U[end_dof + 1]];
      const stress =
        (A[i] * (c * (u2[0] - u1[0]) + s * (u2[1] - u1[1]))) / length;

      result[i] = stress.toFixed(2);
    }

    this.stresses = result;
  }

  computeStrainEnergy() {
    if (!this.displacements) {
      console.error("Displacement not computed");
      return;
    }
    const U = this.displacements;
    const K = this.stiffnessMatrix;
    this.strainEnergy = numeric.dot(numeric.dot(U, K), U) / 2;
  }

  computeTotalVolume() {
    this.totalVolume = this.mesh.normThickness.reduce(
      (acc, val) => acc + val,
      0,
    );
  }

  compute() {
    this.computeStiffnessMatrix();
    this.computeDisplacement();
    this.computeStrainEnergy();
    this.computeTotalVolume();
    this.computeStress();
  }
}

//
// class LatticeOptimizer {
//   constructor(initialMesh) {
//     this.initialMesh = initialMesh;
//     this.currentMesh = { ...initialMesh };
//     this.currentLambda = 1; // Initial Lagrange multiplier
//     this.maxIterations = 100; // Maximum number of iterations
//     this.learningRate = 0.01; // Learning rate for the optimization
//     this.lambda = 1;
//   }
//
//   computeCost() {
//     const fea = new LatticeFEA(this.currentMesh);
//     fea.computeStiffnessMatrix();
//     fea.computeDisplacement();
//     return fea.computeStrainEnergy();
//   }
//
//   computeConstraint() {
//     return (
//       this.currentMesh.normThickness.reduce((acc, val) => acc + val, 0) - 0.3
//     );
//   }
//
//   // Numerical gradient computation
//   computeGradient() {
//     const grad = [];
//     const delta = 1e-6; // Small perturbation for numerical gradient
//     const baseCost = this.computeCost(this.currentMesh);
//
//     this.currentMesh.normThickness.forEach((thickness, i) => {
//       this.currentMesh.normThickness[i] += delta; // Perturb thickness
//       const newCost = this.computeCost(this.currentMesh);
//       grad[i] = (newCost - baseCost) / delta; // Compute gradient
//       this.currentMesh.normThickness[i] -= delta; // Reset thickness
//     });
//
//     return grad;
//   }
//
//   async optimize(progressCallback = null) {
//     for (let iteration = 0; iteration < this.maxIterations; iteration++) {
//       const grad = this.computeGradient();
//       const constraint = this.computeConstraint();
//
//       // Update thicknesses with gradient descent and constraint handling
//       this.currentMesh.normThickness = this.currentMesh.normThickness.map(
//         (thickness, i) => {
//           return (
//             thickness -
//             this.learningRate * (grad[i] + this.currentLambda * constraint)
//           );
//         },
//       );
//
//       // Update Lagrange multiplier for constraint satisfaction
//       this.currentLambda += this.learningRate * constraint;
//
//       // Update the progress bar using the callback
//       if (progressCallback) progressCallback(iteration / this.maxIterations);
//
//       // Check convergence (when gradient and constraint are near zero)
//       if (
//         Math.abs(constraint) < 1e-4 &&
//         grad.every((g) => Math.abs(g) < 1e-4)
//       ) {
//         console.log("Convergence achieved at iteration", iteration);
//         break;
//       }
//     }
//
//     console.log(
//       "Optimization complete. Final thickness values:",
//       this.currentMesh.normThickness,
//     );
//   }
// }

class LatticePlot {
  constructor() {}

  getLineTrace(coords, start, end, lineWidth, color) {
    return {
      x: [coords[start][0], coords[end][0]],
      y: [coords[start][1], coords[end][1]],
      mode: "lines",
      type: "scatter",
      line: { color, width: lineWidth },
    };
  }

  getMarkersTrace(points, symbol, color, size, hoverTemplate) {
    return {
      x: points.map((coord) => coord[0]),
      y: points.map((coord) => coord[1]),
      mode: "markers",
      type: "scatter",
      showscale: true,
      marker: { symbol, color, size },
      hovertemplate: hoverTemplate,
    };
  }

  plot(container, mesh, FEA = null, heightMargin = 0, callback = null) {
    const coords = FEA
      ? mesh.computeDisplacedPoints(FEA.displacements, FEA.ndof_per_node)
      : mesh.points;
    const connections = mesh.connections;
    const normThickness = mesh.normThickness;

    const maxLineWidth = 5;
    const data = [];
    const markerSize = 7;
    const hoverTemplate = "(%{x}, %{y}) <extra></extra>";

    const neutralColor = getContrastColor();
    const maxStress = FEA ? Math.max(...FEA.stresses) : 1;
    const minStress = FEA ? Math.min(...FEA.stresses) : 0;
    const normalizeStress = (value) =>
      (value - minStress) / (maxStress - minStress);

    // Add lines with stress-based colors if available
    connections.forEach(([start, end], index) => {
      const lineWidth =
        maxLineWidth * normThickness[index % normThickness.length];
      const color = FEA
        ? getContinuousScaleColor(
            normalizeStress(FEA.stresses[index]),
            stressTopColor,
            stressBottomColor,
            neutralColor,
          )
        : neutralColor;
      data.push(this.getLineTrace(coords, start, end, lineWidth, color));
    });

    // Node markers
    data.push(
      this.getMarkersTrace(
        coords,
        "circle",
        neutralColor,
        markerSize,
        hoverTemplate,
      ),
    );

    // Fixed points markers
    const fixedPointsCoords = Array.from(mesh.fixedPoints).map(
      (index) => coords[index],
    );
    data.push(
      this.getMarkersTrace(
        fixedPointsCoords,
        "x",
        fixedNodeColor,
        2 * markerSize,
        hoverTemplate,
      ),
    );

    // Force points markers
    const forcePointsCoords = Array.from(mesh.forcePoints).map(
      (index) => coords[index],
    );
    data.push(
      this.getMarkersTrace(
        forcePointsCoords,
        "arrow-up",
        forceNodeColor,
        2 * markerSize,
        hoverTemplate,
      ),
    );

    if (FEA) {
      // Add a dummy trace for the color scale
      data.push({
        x: [null],
        y: [null],
        mode: "markers",
        marker: {
          colorscale: [
            [minStress, stressBottomColor],
            [(maxStress + minStress) / 2, neutralColor],
            [maxStress, stressTopColor],
          ],
          cmin: minStress,
          cmax: maxStress,
          colorbar: {
            title: "Stress",
            thickness: 21,
            len: 0.5,
            x: 0.95, // Position outside the main plot
          },
        },
        showscale: true,
      });
    }

    const aspectRatio = mesh.meshWidth / mesh.meshHeight;
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

// Viewer Class to handle HTML interactions and manage Mesh and Drawer
class LatticeViewer {
  constructor() {
    this.canvasId = "meshPlot";

    this.cellSizeInput = document.getElementById("cellSize");
    this.meshWidthInput = document.getElementById("meshWidth");
    this.meshHeightInput = document.getElementById("meshHeight");
    this.fixedNodeBtn = document.getElementById("selectFixedButton");
    this.forceNodeBtn = document.getElementById("selectForceButton");
    this.feaBtn = document.getElementById("computeFEAButton");
    this.loadingModal = document.getElementById("loadingModal");
    this.infoTable = document.getElementById("infoTable");

    this.latticeType = "cross";
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

    this.FEA = null;
    this.feaBtn.addEventListener("click", async () => {
      await this.computeFEA();
    });

    this.plotter = new LatticePlot();

    // Generate initial mesh
    this.resetMesh();
    this.mesh.addCantileverCase();
    this.renderMeshAndTable();
  }

  async computeFEA() {
    toggleElementVisibility(this.loadingModal, "show");

    this.FEA = new LatticeFEA(this.mesh);
    await this.FEA.compute();
    this.renderMeshAndTable();
    toggleElementVisibility(this.loadingModal, "hide");
  }

  onLatticeTypeChanged(newValue) {
    this.latticeType = newValue;
    this.resetMesh();
    this.renderMeshAndTable();
  }

  onSpinboxChange() {
    this.resetMesh();
    this.renderMeshAndTable();
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
      this.renderMeshAndTable();
    });
  }

  resetMesh() {
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
    this.FEA = null;
  }

  renderMeshAndTable() {
    const container = window.document.querySelector(
      ".app-controller-container",
    );
    if (!container) {
      console.error("Container not found");
      return;
    }
    const plotFn = () => {
      this.plotter.plot(
        this.canvasId,
        this.mesh,
        this.FEA,
        container.clientHeight,
        this.initMouseClickInteraction.bind(this),
      );
    };
    updatePlotHandler([plotFn]);

    this.updateTable();
    this.feaBtn.disabled = !this.mesh.readyForOptimize();
  }

  updateTable() {
    this.infoTable.innerHTML = ""; // Clear the table

    if (!this.FEA) {
      return;
    }

    const tableResult = {
      "Total Thickness": this.FEA.totalVolume,
      "Strain Energy": this.FEA.strainEnergy,
    };

    for (const [key, value] of Object.entries(tableResult)) {
      addKeyValueToTable(this.infoTable, key, value.toFixed(2));
    }
  }
}
