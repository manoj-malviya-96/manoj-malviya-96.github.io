const brandColor = getPrimaryColor();
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
        marker: { symbol: "x", color: brandColor, size: markerSize },
        hovertemplate: hoverTemplate,
      },
      {
        x: Array.from(this.mesh.forcePoints).map((index) => coords[index][0]),
        y: Array.from(this.mesh.forcePoints).map((index) => coords[index][1]),
        mode: "markers",
        type: "scatter",
        marker: { symbol: "triangle-up", color: brandColor, size: markerSize },
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

// Viewer Class to handle HTML interactions and manage Mesh and Drawer
class LatticeViewer {
  constructor() {
    this.canvasId = "meshPlot";

    this.cellSizeInput = document.getElementById("cellSize");
    this.meshWidthInput = document.getElementById("meshWidth");
    this.meshHeightInput = document.getElementById("meshHeight");
    this.fixedNodeBtn = document.getElementById("selectFixedButton");
    this.forceNodeBtn = document.getElementById("selectForceButton");

    this.latticeType = "square";
    setupAllSpinBoxsWithOneCallback(this.onSpinboxChange.bind(this));
    setupDropdown(
      document.getElementById("latticeTypeDropdown"),
      this.onLatticeTypeChanged.bind(this),
    );

    this.mouseClickMode = MouseMode.Normal;

    this.fixedNodeBtn.addEventListener("click", () => {
      if (this.fixedNodeBtn.classList.contains("selected")) {
        this.mouseClickMode = MouseMode.Normal;
        this.fixedNodeBtn.classList.remove("selected");
      } else {
        this.mouseClickMode = MouseMode.Fix;
        this.fixedNodeBtn.classList.add("selected");
      }
    });

    this.forceNodeBtn.addEventListener("click", () => {
      if (this.forceNodeBtn.classList.contains("selected")) {
        this.mouseClickMode = MouseMode.Normal;
        this.forceNodeBtn.classList.remove("selected");
      } else {
        this.mouseClickMode = MouseMode.Force;
        this.forceNodeBtn.classList.add("selected");
      }
    });

    // Generate initial mesh
    this.updateMesh();
    this.visualizeMesh();
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
    this.drawer.plot(
      this.canvasId,
      container.clientHeight,
      this.initMouseClickInteraction.bind(this),
    );
    // const plotFn = () => {
    //   this.drawer.plot(this.canvasId, container.clientHeight);
    // };
    // updatePlotHandler([plotFn]);
  }
}
