const brandColor = getPrimaryColor();
class LatticeMesh {
  constructor(cellSize, meshWidth, meshHeight, latticeType) {
    this.cellSize = cellSize;
    this.meshWidth = meshWidth;
    this.meshHeight = meshHeight;
    this.latticeType = latticeType;
    this.points = [];
    this.connections = [];
    this.generateMeshData();
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
  }

  getPoints() {
    return this.points;
  }

  getConnections() {
    return this.connections;
  }
}

// Drawer Class to interact with HTML and draw the Mesh using Plotly
class LatticeDrawer {
  constructor(mesh, lineWidths = []) {
    this.mesh = mesh;
    this.lineWidths = lineWidths.length
      ? lineWidths
      : new Array(mesh.getConnections().length).fill(2); // Default width 2 if not provided
  }

  plot(container, heightMargin = 0) {
    const coords = this.mesh.getPoints();
    const connections = this.mesh.getConnections();
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
      lines.line.width.push(this.lineWidths[index % this.lineWidths.length]);
    });

    // Plot using Plotly
    const data = [
      lines,
      {
        x: coords.map((coord) => coord[0]),
        y: coords.map((coord) => coord[1]),
        mode: "markers",
        type: "scatter",
        marker: { color: brandColor, size: 7, opacity: 0.69 },
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
    Plotly.newPlot(container, data, layout);
  }

  setLineWidths(widths) {
    this.lineWidths = widths.length
      ? widths
      : new Array(this.mesh.getConnections().length).fill(2);
  }
}

// Viewer Class to handle HTML interactions and manage Mesh and Drawer
class LatticeViewer {
  constructor() {
    this.cellSizeInput = document.getElementById("cellSize");
    this.meshWidthInput = document.getElementById("meshWidth");
    this.meshHeightInput = document.getElementById("meshHeight");
    this.latticeType = "square"; // document.getElementById("latticeType");

    setupAllSpinBoxsWithOneCallback(this.updateMesh.bind(this));
    setupDropdown(
      document.getElementById("latticeTypeDropdown"),
      this.updateLattice.bind(this),
    );

    // Generate initial mesh
    this.updateMesh();
  }

  updateLattice(newValue) {
    this.latticeType = newValue;
    this.updateMesh();
  }

  updateMesh() {
    // Get input values
    const cellSize = parseFloat(this.cellSizeInput.value);
    const meshWidth = parseFloat(this.meshWidthInput.value);
    const meshHeight = parseFloat(this.meshHeightInput.value);

    // Create Mesh object
    const mesh = new LatticeMesh(
      cellSize,
      meshWidth,
      meshHeight,
      this.latticeType,
    );

    // Example internal API usage for setting variable line widths
    const drawer = new LatticeDrawer(mesh);

    const container = window.document.querySelector(
      ".app-controller-container",
    );
    if (!container) {
      console.error("Container not found");
      return;
    }

    // Plot the mesh
    const plotFn = () => {
      drawer.plot("meshPlot", container.clientHeight);
    };
    updatePlotHandler([plotFn]);
  }
}
