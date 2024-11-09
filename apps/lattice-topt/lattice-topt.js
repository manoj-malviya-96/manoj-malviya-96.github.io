const maxLineWidth = 7;
const MouseMode = {
  Normal: 0,
  Fix: 1,
  Force: 2,
};

const stressTopColor = `rgb(189, 92, 92)`;
const stressBottomColor = `rgb(46, 108, 189)`;
const fixedNodeColor = `rgb(188, 232, 140)`;
const forceNodeColor = `rgb(128, 9, 255)`;

const minNormalizedThickness = 0.099;

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
  constructor(mesh, E = 1) {
    this.mesh = mesh;
    this.E = E;
    this.ndof_per_node = 2;
    this.ndof = this.mesh.points.length * this.ndof_per_node;

    this.stiffnessMatrix = null;
    this.displacements = null;
    this.stresses = null;
    this.strainEnergy = null;
    this.derivative_strainEnergy = null;
    this.totalVolume = null;
  }

  compute() {
    // Step 1: Compute global stiffness matrix
    const K = Array.from({ length: this.ndof }, () => Array(this.ndof).fill(0));

    this.mesh.connections.forEach(([start, end], index) => {
      const length = this.mesh.lengths[index];
      const A = this.mesh.normThickness[index];
      const k = (this.E * A) / length;

      const [c, s] = this.mesh.directionCosines[index];

      const ke = [
        [c * c * k, c * s * k, -c * c * k, -c * s * k],
        [c * s * k, s * s * k, -c * s * k, -s * s * k],
        [-c * c * k, -c * s * k, c * c * k, c * s * k],
        [-c * s * k, -s * s * k, c * s * k, s * s * k],
      ];

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

    // Step 2: Apply boundary conditions and compute displacements
    this.mesh.fixedPoints.forEach((index) => {
      const start_dof = index * this.ndof_per_node;
      for (let i = 0; i < this.ndof_per_node; i++) {
        K[start_dof + i].fill(0);
        K[start_dof + i][start_dof + i] = 1;
      }
    });

    const F = new Array(this.ndof).fill(0);
    this.mesh.forcePoints.forEach((index) => {
      F[index * this.ndof_per_node + 1] = 1; // Example: apply force in y direction
    });

    let U = null;
    try {
      U = numeric.solve(K, F);
    } catch (e) {
      console.error("Error solving for displacements:", e);
      return;
    }
    this.displacements = U;

    // Step 3: Compute stresses in each element
    const A = this.mesh.normThickness;
    this.stresses = this.mesh.connections.map(([start, end], i) => {
      if (A[i] <= 0) {
        return 0;
      }
      const length = this.mesh.lengths[i];
      const start_dof = start * this.ndof_per_node;
      const end_dof = end * this.ndof_per_node;

      const u1 = [U[start_dof], U[start_dof + 1]];
      const u2 = [U[end_dof], U[end_dof + 1]];

      const deltaU = u2.map((val, idx) => val - u1[idx]);
      const axialForce =
        deltaU[0] * this.mesh.directionCosines[i][0] +
        deltaU[1] * this.mesh.directionCosines[i][1];

      return (this.E * axialForce) / (A[i] * length);
    });

    // Step 4: Compute strain energy
    this.strainEnergy = numeric.dot(numeric.dot(U, K), U) / 2;

    // Step 5: Compute derivative of strain energy with respect to area
    this.derivative_strainEnergy = this.mesh.connections.map((_, i) => {
      const F_i = this.stresses[i] * A[i] * this.mesh.lengths[i];
      return (-1 * F_i ** 2) / (2 * this.E * this.mesh.lengths[i]);
    });

    // Step 6: Compute total volume
    this.totalVolume = A.reduce(
      (acc, val, i) => acc + val * this.mesh.lengths[i],
      0,
    );
  }
}

class LatticeOptimizer {
  constructor(initialMesh, numIterations = 200, targetFraction = 0.4) {
    this.currentMesh = initialMesh;
    this.numIterations = numIterations;
    this.targetFraction = targetFraction;
    this.initialMesh = initialMesh;

    const fea = new LatticeFEA(initialMesh);
    fea.compute();
    this.startObj = fea.strainEnergy;
    this.startVolume = fea.totalVolume;

    this.success = true;
  }

  computeLambda(X, dc, lengths) {
    // Bisection parameters
    let l1 = 1e-24;
    let l2 = 1e24;
    const tolerance = 1e-4;
    let X_temp = X;
    const targetVolume = this.startVolume * this.targetFraction;

    let lmid = (l1 + l2) / 2;

    while (l2 - l1 > tolerance) {
      lmid = 0.5 * (l2 + l1);

      // Calculate potential `X_new` based on current `lmid`
      X_temp = X.map((x, index) => {
        const d = Math.sqrt((-1 * dc[index]) / lmid);
        const xn = x * d;
        return Math.max(Math.min(1, xn), minNormalizedThickness);
      });

      // Calculate volume of `X_temp`
      const currentVolume = X_temp.reduce(
        (sum, xi, i) => sum + xi * lengths[i],
        0,
      );

      // Adjust `l1` and `l2` based on volume constraint
      if (currentVolume >= targetVolume) {
        l1 = lmid; // Increase `lmid` to reduce volume
      } else {
        l2 = lmid; // Decrease `lmid` to increase volume
      }
    }
    return X_temp; // Return the lambda that satisfies the volume constraint
  }

  iterate() {
    const mesh = this.currentMesh;
    const X = mesh.normThickness;

    const FEA = new LatticeFEA(mesh);
    FEA.compute();

    const obj = FEA.strainEnergy / this.startObj;
    if (isNaN(obj)) {
      this.success = false;
      return;
    }

    const penn = Math.pow(obj, 2); // Penalty term
    const dObj_dX = FEA.derivative_strainEnergy.map((dc) => penn * dc);

    const newThickness = this.computeLambda(X, dObj_dX, mesh.lengths);

    // Check if all elements are at the minimum thickness
    if (newThickness.every((val) => val <= minNormalizedThickness)) {
      console.error("All elements are at minimum thickness");
      this.success = false;
      return;
    }

    this.currentMesh.normThickness = newThickness;
  }

  async optimize() {
    for (let i = 0; i < this.numIterations; i++) {
      await this.iterate();

      if (!this.success) {
        console.error("Iteration failed");
        return;
      }
    }
    this.success = true;
  }
}

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
      const th =
        normThickness[index] <= minNormalizedThickness
          ? 0
          : normThickness[index];
      const lineWidth = maxLineWidth * th;

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
        "arrow-wide",
        forceNodeColor,
        2 * markerSize,
        hoverTemplate,
      ),
    );

    if (FEA) {
      console.log(maxStress, minStress, (maxStress + minStress) / 2);
      console.log(FEA.stresses);
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

    plotlyPlot(container, data, layout, callback);
  }
}

// Viewer Class to handle HTML interactions and manage Mesh and Drawer
class LatticeViewer {
  constructor() {
    this.canvasId = "meshPlot";
    this.FEA = null;
    this.plotter = new LatticePlot();

    this.cellSizeInput = document.getElementById("cellSize");
    this.meshWidthInput = document.getElementById("meshWidth");
    this.meshHeightInput = document.getElementById("meshHeight");
    this.fixedNodeBtn = document.getElementById("selectFixedButton");
    this.forceNodeBtn = document.getElementById("selectForceButton");
    this.feaBtn = document.getElementById("computeFEAButton");
    this.resetBtn = document.getElementById("resetButton");
    this.optimizeBtn = document.getElementById("optButton");
    this.loadingModal = document.getElementById("loadingModal");
    this.infoText = document.getElementById("infoText");

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

    this.feaBtn.addEventListener("click", async () => {
      await this.computeFEA();
    });

    this.optimizeBtn.addEventListener("click", async () => {
      await this.optimize();
    });

    this.resetBtn.addEventListener("click", () => {
      this.resetMesh();
      this.renderMeshAndTable();
    });

    // Generate initial mesh
    this.resetMesh();
    this.mesh.addCantileverCase();
    this.renderMeshAndTable();
  }

  async computeFEA() {
    toggleElementVisibility(this.loadingModal, "show");

    if (this.FEA) {
      this.deactivateFEAMode();
    } else {
      await this.activeFEAMode();
    }

    this.renderMeshAndTable();
    toggleElementVisibility(this.loadingModal, "hide");
  }

  async activeFEAMode() {
    this.FEA = new LatticeFEA(this.mesh);
    await this.FEA.compute();
    this.feaBtn.classList.add("selected");
  }

  deactivateFEAMode() {
    this.FEA = null;
    this.feaBtn.classList.remove("selected");
  }

  async optimize() {
    toggleElementVisibility(this.loadingModal, "show");

    if (this.FEA) {
      this.deactivateFEAMode();
    }

    const optimizer = new LatticeOptimizer(this.mesh);
    await optimizer.optimize();

    if (!optimizer.success) {
      this.infoText.textContent = "Optimization failed";
    } else {
      this.mesh = optimizer.currentMesh;
      this.renderMeshAndTable();
    }
    runWithDelay(() => toggleElementVisibility(this.loadingModal, "hide"), 500);
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
    this.optimizeBtn.disabled = this.feaBtn.disabled;
  }

  updateTable() {
    this.infoText.innerHTML = ""; // Clear the table

    if (!this.FEA) {
      this.infoText.textContent = "FEA not computed";
      return;
    }

    const tableResult = {
      Volume: this.FEA.totalVolume,
      "Strain-Energy": this.FEA.strainEnergy,
    };

    for (const [key, value] of Object.entries(tableResult)) {
      this.infoText.innerHTML += `<b>${key}:</b> ${value.toFixed(2)}<br>`;
    }
  }
}
