const meshViewWidth = appWindowWidth;
const meshViewHeight = appWindowHeight;
const mainLightColor = 0xffffff;
const softLightColor = 0x404040;
const modelColor = 0x808080;
const primaryColor = getPrimaryColor();

class LoadedMesh {
  constructor() {
    this.geometry = null;
    this.centroid = null;

    this.volume = 0;
    this.numTriangles = 0;
    this.boundingBox = null;

    // Internals
    this._loader = new THREE.STLLoader();
  }

  load(arrayBuffer) {
    this.geometry = this._loader.parse(arrayBuffer);
    this.centroid = this.computeAccurateCentroid(this.geometry);
    this.volume = this.computeVolume(this.geometry);
    this.numTriangles = this.geometry.index
      ? this.geometry.index.count / 3
      : this.geometry.attributes.position.count / 3;
    this.boundingBox = this.computeBoundingBox(this.geometry);
  }

  simplifyMesh(value = 0.5) {
    console.log("Simplifying mesh with value", value);
  }

  computeAccurateCentroid(geometry) {
    const centroid = new THREE.Vector3();
    const position = geometry.attributes.position;
    const numVertices = position.count;

    for (let i = 0; i < numVertices; i++) {
      centroid.add(
        new THREE.Vector3(position.getX(i), position.getY(i), position.getZ(i)),
      );
    }

    centroid.divideScalar(numVertices);
    return centroid;
  }

  computeVolume(geometry) {
    let volume = 0;
    const position = geometry.attributes.position;

    for (let i = 0; i < position.count; i += 3) {
      const p1 = new THREE.Vector3(
        position.getX(i),
        position.getY(i),
        position.getZ(i),
      );
      const p2 = new THREE.Vector3(
        position.getX(i + 1),
        position.getY(i + 1),
        position.getZ(i + 1),
      );
      const p3 = new THREE.Vector3(
        position.getX(i + 2),
        position.getY(i + 2),
        position.getZ(i + 2),
      );
      volume += p1.dot(p2.cross(p3)) / 6.0;
    }

    return Math.abs(volume);
  }

  computeBoundingBox(geometry) {
    return new THREE.Box3().setFromBufferAttribute(
      geometry.attributes.position,
    );
  }
}

class MeshRenderer {
  constructor(canvas, width = meshViewWidth, height = meshViewHeight) {
    this.scene = new THREE.Scene();
    this.material = new THREE.MeshPhongMaterial({ color: modelColor });
    this.loadedMesh = new LoadedMesh();

    this.webGLRenderer = null;
    this.camera = null;
    this.controls = null;
    this.renderedMeshes = []; // Keeps track of all rendered meshes

    this.setupCamera(width, height);
    this.setupWebGLRenderer(canvas, width, height);
    this.setupLights();
    this.setupControls();

    this._exporter = new THREE.STLExporter();
  }

  setupWebGLRenderer(canvas, width, height) {
    this.webGLRenderer = new THREE.WebGLRenderer({ canvas });
    this.webGLRenderer.setSize(width, height);
  }

  updateModal() {
    this.controls.update();
    this.webGLRenderer.render(this.scene, this.camera);
  }

  saveMesh() {
    return this._exporter.parse(this.scene);
  }

  setupCamera(width, height) {
    this.camera = new THREE.PerspectiveCamera(
      75,
      width / height, // Aspect ratio to match your canvas
      1,
      1000,
    );
  }

  setupLights() {
    if (!this.scene) {
      console.error("No scene available to add lights to.");
      return;
    }
    const hemisphereLight = new THREE.HemisphereLight(
      mainLightColor,
      softLightColor,
      1.2,
    );
    hemisphereLight.position.set(0, 20, 0);
    this.scene.add(hemisphereLight);
  }

  setupControls() {
    // Add OrbitControls for better user interaction like CAD software
    this.controls = new THREE.OrbitControls(
      this.camera,
      this.webGLRenderer.domElement,
    );
    this.controls.enableDamping = true; // Smooth the control movements
    this.controls.dampingFactor = 0.05;
    this.controls.screenSpacePanning = false;
    this.controls.maxPolarAngle = Math.PI * 2;
  }

  loadMesh(arrayBuffer) {
    try {
      // Load the mesh from buffer
      this.loadedMesh.load(arrayBuffer);
      this.renderMesh(true); // Loading first time, so center to centroid
      // Render it with centered to centroid
    } catch (error) {
      console.error("Error loading mesh", error);
    }
  }

  renderMesh(centerToModelOrigin = false) {
    if (this.renderedMeshes.length > 0) {
      console.log("Clearing existing meshes");
      this.clearRenderedMeshes();
    }
    // Render the loaded mesh
    this.renderLoadedMesh(
      this.loadedMesh.geometry,
      this.material,
      centerToModelOrigin ? this.loadedMesh.centroid : null,
    );
    // Render the centroid
    this.renderCentroid(new THREE.Vector3(0, 0, 0));
    // Set the camera to look at the centroid
    this.controls.target.set(0, 0, 0);
    this.controls.update();
  }

  updateScreenSize(width, height) {
    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
    this.webGLRenderer.setSize(width, height);
    this.controls.update();
  }

  clearRenderedMeshes() {
    this.renderedMeshes.forEach((mesh) => this.scene.remove(mesh));
    this.renderedMeshes = [];
  }

  addRenderedMeshToScene(mesh) {
    this.scene.add(mesh);
    this.renderedMeshes.push(mesh);
  }

  renderLoadedMesh(geometry, material, centroid = null) {
    const renderedMesh = new THREE.Mesh(geometry, material);
    if (centroid) {
      renderedMesh.geometry.translate(-centroid.x, -centroid.y, -centroid.z); // Center the mesh
    }

    this.addRenderedMeshToScene(renderedMesh);
  }

  renderCentroid(centroid) {
    const radius = 0.69;
    const segments = 16;
    const centroidGeometry = new THREE.SphereGeometry(
      radius,
      segments,
      segments,
    );

    const centroidMaterial = new THREE.MeshBasicMaterial({
      color: primaryColor,
    });

    const centroidPoint = new THREE.Mesh(centroidGeometry, centroidMaterial);
    centroidPoint.position.copy(centroid);
    this.addRenderedMeshToScene(centroidPoint);
  }

  homeControls() {
    this.controls.lookAt(0, 0, 0);
    this.controls.update();
  }

  homeView(onlyApplyPosition = false) {
    const boundingBox = this.loadedMesh.boundingBox;

    const center = new THREE.Vector3();
    boundingBox.getCenter(center);
    const size = new THREE.Vector3();
    boundingBox.getSize(size);

    // Set the camera to a position that fits the entire model
    const maxDimension = Math.max(size.x, size.y, size.z);
    const fitHeightDistance =
      maxDimension /
      (2 * Math.tan(THREE.MathUtils.degToRad(this.camera.fov / 2)));
    const fitWidthDistance = fitHeightDistance / this.camera.aspect;
    const distance = Math.max(fitHeightDistance, fitWidthDistance);

    // Update camera position to make sure the model fits
    this.camera.position.set(center.x, center.y, center.z + distance * 1.5); // Add a little extra distance for padding
    if (onlyApplyPosition) {
      return;
    }

    this.camera.lookAt(center);
    // Update controls, if applicable
    if (this.controls) {
      this.controls.target.copy(center);
      this.controls.update();
    }
  }

  moveCameraBy(axis = "x", angle) {
    let axisVector = null;
    switch (axis) {
      case "x":
        axisVector = new THREE.Vector3(1, 0, 0);
        break;
      case "y":
        axisVector = new THREE.Vector3(0, 1, 0);
        break;
      case "z":
        axisVector = new THREE.Vector3(0, 0, 1);
        break;
    }
    this.camera.position.applyAxisAngle(axisVector, angle);
  }
}

class MeshView {
  constructor() {
    this.elements = this.getDomElements();
    this.renderer = new MeshRenderer(this.elements.canvas);
    this.fileName = "No file loaded";
    this.initEventListeners();
    this.toggleAppController();
  }

  getDomElements() {
    return {
      appWindow: window.document.querySelector(".app-window"),
      appController: window.document.querySelector(".app-controller"),
      canvas: window.document.getElementById("meshCanvas"),
      infoBtn: window.document.getElementById("infoBtn"),
      infoModal: window.document.getElementById("infoModal"),
      infoTable: window.document.getElementById("infoTable"),
      // simplifyBtn: window.document.getElementById("simplifyBtn"),
      // simplifyModal: window.document.getElementById("simplifyModal"),
      // simplifyValue: window.document.getElementById("simplifyFactor"),
      // simplifySlider: window.document.getElementById("simplifySlider"),
      loadingModal: window.document.getElementById("loadingModal"),
      fileDropZone: window.document.getElementById("fileDropZone"),
      fileUploadBtn: window.document.getElementById("fileUploadBtn"),
      fileDownloadBtn: window.document.getElementById("fileDownloadBtn"),
      appControllerContainer: window.document.getElementById(
        "appControllerContainer",
      ),
      toggleFullScreenBtn: window.document.getElementById(
        "toggleFullScreenBtn",
      ),
    };
  }

  loadMesh(arrayBuffer) {
    if (!this.renderer) {
      console.error("Some how mesh-renderer is not init");
    }

    this.renderer.loadMesh(arrayBuffer);
    if (!this.renderer.renderedMeshes.length > 0) {
      console.error("Mesh cant be loaded");
    }
    this.handleSuccessFileUpload();
    this.renderer.homeView();
  }

  animate() {
    requestAnimationFrame(() => this.animate());
    this.renderer.updateModal();
  }

  handleSuccessFileUpload() {
    if (!this.elements.fileDropZone.classList.contains("hidden")) {
      this.elements.fileDropZone.classList.add("hidden");
    }

    this.elements.fileUploadBtn.classList.remove("hidden");
    this.elements.appControllerContainer.classList.remove("hidden");

    this.toggleAppController(true);
  }

  toggleAppController(forceShow = false) {
    if (
      forceShow &&
      !this.elements.appController.classList.contains("hidden")
    ) {
      return;
    }
    this.elements.appController.classList.toggle("hidden");
  }

  handleDropZoneBtnClick() {
    const input = window.document.createElement("input");
    input.type = "file";
    input.accept = ".stl";
    input.onchange = (event) => {
      this.loadFile(event.target.files[0]);
    };
    input.click();
  }

  handleDropZoneDragOver(event) {
    event.preventDefault();
    this.elements.fileDropZone.classList.add("active");
  }

  handleDropZoneDragLeave(event) {
    event.preventDefault();
    this.elements.fileDropZone.classList.remove("active");
  }

  handleDropZoneDrop(event) {
    event.preventDefault();
    this.loadFile(event.dataTransfer.files[0]);
  }

  handleSaveFile() {
    console.log("Saving file");
    event.preventDefault();
    this.saveFile();
  }

  toggleLoadingDisplay(showOrHide = "show") {
    toggleElementVisibility(this.elements.loadingModal, showOrHide);
  }

  toggleFullScreenDropZone(showOrHide = "show") {
    toggleElementVisibility(this.elements.fileDropZone, showOrHide);
  }

  toggleFullScreenActive(makeItActive = false) {
    if (makeItActive) {
      this.elements.fileDropZone.classList.add("active");
    } else {
      this.elements.fileDropZone.classList.remove("active");
    }
  }

  loadFile(file) {
    if (!file) {
      console.error("No file provided to load.");
    }

    this.renderer.clearRenderedMeshes(); // Clear any existing meshes
    this.fileName = file.name; // Update the file name

    this.toggleFullScreenActive(false);
    this.toggleFullScreenDropZone("hide");
    this.toggleLoadingDisplay("show");

    runWithDelay(() => {
      const reader = new FileReader();
      reader.onload = (e) => {
        this.loadMesh(e.target.result);
        this.toggleLoadingDisplay("hide");
        this.updateTable();
      };
      reader.readAsArrayBuffer(file);
    }); // Wait for the mesh to load
  }

  saveFile() {
    const stlString = this.renderer.saveMesh();
    console.log("Saving file", stlString);
    // Create a Blob from the STL string
    const blob = new Blob([stlString], { type: "model/stl" });

    // Create an anchor element to download the file
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "mesha.stl";
    link.click();

    // Release the URL
    URL.revokeObjectURL(link.href);
  }

  handleViewButton(view) {
    const angle = Math.PI / 2; // 90 degrees in radians

    switch (view) {
      case "top":
        this.renderer.moveCameraBy("x", angle);
        break;
      case "bottom":
        this.renderer.moveCameraBy("x", -angle);
        break;
      case "right":
        this.renderer.moveCameraBy("y", -angle);
        break;
      case "left":
        this.renderer.moveCameraBy("y", angle);
        break;
      case "home": // Reset to default position
        this.renderer.homeView(true);
        break;
    }
    this.renderer.homeControls();
  }

  initEventListeners() {
    // Handle file uploads via the drop zone
    this.elements.fileDropZone.addEventListener(
      "click",
      this.handleDropZoneBtnClick.bind(this),
    );
    // Handle drag-and-drop uploads
    this.elements.fileDropZone.addEventListener(
      "dragover",
      this.handleDropZoneDragOver.bind(this),
    );
    this.elements.fileDropZone.addEventListener(
      "dragleave",
      this.handleDropZoneDragLeave.bind(this),
    );
    this.elements.fileDropZone.addEventListener(
      "drop",
      this.handleDropZoneDrop.bind(this),
    );
    // Handle file uploads via the smaller-drop zone
    this.elements.fileUploadBtn.addEventListener(
      "click",
      this.handleDropZoneBtnClick.bind(this),
    );

    // Handle file downloads
    this.elements.fileDownloadBtn.addEventListener(
      "click",
      this.handleSaveFile.bind(this),
    );

    this.elements.toggleFullScreenBtn.addEventListener(
      "click",
      this.toggleFullScreen.bind(this),
    );

    this.elements.infoBtn.addEventListener(
      "click",
      this.toggleInfoModal.bind(this),
    );
    addOutsideClickHandler(this.elements.infoBtn, this.elements.infoModal);

    // this.elements.simplifyBtn.addEventListener(
    //   "click",
    //   this.toggleSimplifyModal.bind(this),
    // );
    // addOutsideClickHandler(
    //   this.elements.simplifyBtn,
    //   this.elements.simplifyModal,
    // );
    // this.elements.simplifySlider.addEventListener(
    //   "input",
    //   this.handleSimplify.bind(this),
    // );

    // Handle view panel button clicks
    const viewContainer = window.document.getElementById("viewButtonGrid");
    viewContainer.querySelectorAll(".primary-button").forEach((button) => {
      button.addEventListener(
        "click",
        this.handleViewButton.bind(this, button.getAttribute("data-view")),
      );
    });
    this.setupResizing();
    this.setupKeyboardShortcuts();
  }

  handleSimplify(event) {
    const value = event.target.value;
    this.elements.simplifyValue.innerHTML = value.toString();

    this.renderer.clearRenderedMeshes();
    this.toggleLoadingDisplay("show");

    this.renderer.loadedMesh.simplifyMesh(value);

    runWithDelay(() => {
      this.renderer.renderMesh();
      this.updateTable();
      this.toggleLoadingDisplay("hide");
    });
  }

  updateTable() {
    this.elements.infoTable.innerHTML = ""; // Clear the table
    addKeyValueToTable(this.elements.infoTable, "File", this.fileName);

    if (!this.renderer.loadedMesh) {
      console.error(this.renderer.loadedMesh);
      return;
    }

    addKeyValueToTable(
      this.elements.infoTable,
      "Volume",
      Math.round(this.renderer.loadedMesh.volume),
    );
    addKeyValueToTable(
      this.elements.infoTable,
      "Triangles",
      this.renderer.loadedMesh.numTriangles,
    );
  }

  setupKeyboardShortcuts() {
    window.document.addEventListener("keydown", this.handleKeydown.bind(this));
  }

  handleKeydown(event) {
    event.preventDefault(); // Prevent default behavior of keys

    if (event.code === "Enter" || event.code === "KeyF") {
      this.toggleFullScreen();
    }
    if (event.code === "ArrowUp") {
      this.handleViewButton("top");
    }
    if (event.code === "ArrowDown") {
      this.handleViewButton("bottom");
    }
    if (event.code === "ArrowLeft") {
      this.handleViewButton("left");
    }
    if (event.code === "ArrowRight") {
      this.handleViewButton("right");
    }
  }

  setupResizing() {
    window.document.addEventListener("fullscreenchange", () => {
      // Enter full-screen
      if (document.fullscreenElement === this.elements.appWindow) {
        this.elements.appWindow.classList.add("full-screen-modal");
        this.elements.toggleFullScreenBtn.innerHTML =
          '<i class="bi bi-fullscreen-exit"></i>'; // Change icon for full-screen
        this.renderer.updateScreenSize(window.innerWidth, window.innerHeight);
        return;
      }
      // Exit full-screen
      this.elements.appWindow.classList.remove("full-screen-modal");
      this.elements.toggleFullScreenBtn.innerHTML =
        '<i class="bi bi-arrows-fullscreen"></i>'; // Change icon when exiting full-screen
      this.renderer.updateScreenSize(meshViewWidth, meshViewHeight);
    });
  }

  toggleFullScreen() {
    if (
      !this.elements.appWindow.classList.contains("full-screen-modal") &&
      !window.document.fullscreenElement
    ) {
      this.elements.appWindow.requestFullscreen();
    } else if (window.document.exitFullscreen) {
      window.document.exitFullscreen();
    }
  }

  toggleInfoModal() {
    toggleElementVisibility(this.elements.infoModal);
  }

  // toggleSimplifyModal() {
  //   toggleElementVisibility(this.elements.simplifyModal);
  // }
}
