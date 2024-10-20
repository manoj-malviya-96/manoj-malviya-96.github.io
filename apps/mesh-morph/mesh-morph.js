class MeshLoader {
  constructor() {
    this.loader = new THREE.STLLoader();
  }

  load(arrayBuffer) {
    return this.loader.parse(arrayBuffer);
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
  constructor(scene) {
    this.scene = scene;
    this.mesh = null;
    this.centroidPoint = null;
  }

  renderMesh(geometry, material) {
    if (this.mesh) {
      this.scene.remove(this.mesh);
      if (this.centroidPoint) this.scene.remove(this.centroidPoint);
    }

    this.mesh = new THREE.Mesh(geometry, material);
    this.scene.add(this.mesh);

    return this.mesh;
  }

  addCentroidPoint(centroid) {
    const centroidGeometry = new THREE.SphereGeometry(0.05, 16, 16);
    const centroidMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000 });
    this.centroidPoint = new THREE.Mesh(centroidGeometry, centroidMaterial);
    this.centroidPoint.position.copy(centroid);
    this.scene.add(this.centroidPoint);
  }
}

const meshViewWidth = appWindowWidth;
const meshViewHeight = appWindowHeight;
const mainLightColor = 0xffffff;
const softLightColor = 0x404040;
const modelColor = 0x808080;
const primaryColor = getPrimaryColor();


class MeshView {
  constructor() {
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(
      75,
      meshViewWidth / meshViewHeight, // Aspect ratio to match your canvas
      1,
      1000,
    );
    const canvas = document.getElementById("meshCanvas");
    this.renderer = new THREE.WebGLRenderer({ canvas });
    this.renderer.setSize(meshViewWidth, meshViewHeight); // Match the canvas size

    // Add light sources
    const directionalLight = new THREE.DirectionalLight(mainLightColor, 1);
    directionalLight.position.set(5, 5, 5).normalize();
    this.scene.add(directionalLight);

    const ambientLight = new THREE.AmbientLight(softLightColor); // Soft light
    this.scene.add(ambientLight);

    // Add OrbitControls for better user interaction like CAD software
    this.controls = new THREE.OrbitControls(
      this.camera,
      this.renderer.domElement,
    );
    this.controls.enableDamping = true; // Smooth the control movements
    this.controls.dampingFactor = 0.05;
    this.controls.screenSpacePanning = false;
    this.controls.maxPolarAngle = Math.PI * 2;

    this.meshLoader = new MeshLoader();
    this.meshRenderer = new MeshRenderer(this.scene);

    this.infoPanel = document.getElementById("infoPanel");
    this.loadingText = document.getElementById("loading");
    this.fullScreenDropZone = document.getElementById("fullScreenDropZone");
    this.smallerDropZone = document.getElementById("smallerDropZone");
    this.appControllerContainer = window.document.getElementById(
      "appControllerContainer",
    );
    this.appController = window.document.querySelector(".app-controller");

    this.initEventListeners();
    this.toggleAppController();
  }

  loadMesh(arrayBuffer) {
    const geometry = this.meshLoader.load(arrayBuffer);
    const material = new THREE.MeshPhongMaterial({ color: modelColor });
    const mesh = this.meshRenderer.renderMesh(geometry, material);

    // Compute the centroid and volume of the mesh
    const centroid = this.meshLoader.computeAccurateCentroid(geometry);
    const volume = this.meshLoader.computeVolume(geometry);
    mesh.geometry.translate(-centroid.x, -centroid.y, -centroid.z); // Center the mesh

    this.meshRenderer.addCentroidPoint(new THREE.Vector3(0, 0, 0));
    this.controls.target.set(0, 0, 0);
    this.controls.update();

    this.geometry = geometry;

    // Update information panel
    this.prepareAppControllerPostSuccessfulFileUpload();

    document.getElementById("info-volume").innerText =
      `Volume: ${volume.toFixed(2)}`;
    document.getElementById("info-triangles").innerText =
      `Number of Triangles: ${geometry.index ? geometry.index.count / 3 : geometry.attributes.position.count / 3}`;

    this.homeView();
  }

  animate() {
    requestAnimationFrame(() => this.animate());
    this.controls.update();
    this.renderer.render(this.scene, this.camera);
  }

  prepareAppControllerPostSuccessfulFileUpload() {
    this.infoPanel.style.display = "block";
    this.loadingText.style.display = "none";

    if (!this.fullScreenDropZone.classList.contains("hidden")) {
      this.fullScreenDropZone.classList.add("hidden");
    }

    this.smallerDropZone.classList.remove("hidden");
    this.appControllerContainer.classList.remove("hidden");

    this.toggleAppController(true);
  }

  toggleAppController(forceShow = false) {
    if (forceShow && !this.appController.classList.contains("hidden")) {
      return;
    }
    this.appController.classList.toggle("hidden");
  }

  handleDropZoneBtnClick() {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = ".stl";
    input.onchange = (event) => {
      const file = event.target.files[0];
      if (file) {
        this.loadingText.style.display = "block";
        const reader = new FileReader();
        reader.onload = (e) => {
          this.loadMesh(e.target.result);
        };
        reader.readAsArrayBuffer(file);
      }
    };
    input.click();
  }

  handleDropZoneDragOver(event) {
    event.preventDefault();
    this.fullScreenDropZone.classList.add("active");
    this.fullScreenDropZone.style.backgroundColor = primaryColor;
    this.fullScreenDropZone.style.color = "#777";
  }

  handleDropZoneDragLeave(event) {
    event.preventDefault();
    this.fullScreenDropZone.classList.remove("active");
    this.fullScreenDropZone.style.backgroundColor = "transparent";
    this.fullScreenDropZone.style.color = "#aaa";
  }

  handleDropZoneDrop(event) {
    event.preventDefault();
    this.fullScreenDropZone.classList.remove("active");
    this.loadingText.style.display = "block";

    const file = event.dataTransfer.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        this.loadMesh(e.target.result);
      };
      reader.readAsArrayBuffer(file);
    }
  }

  homeView(onlyApplyPosition = false) {
    if (!this.meshLoader && !this.geometry) {
      console.error("No geometry available to compute home view.");
      return;
    }

    const boundingBox = this.meshLoader.computeBoundingBox(this.geometry);

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

  handleViewButton(view) {
    const angle = Math.PI / 2; // 90 degrees in radians

    switch (view) {
      case "top":
        this.camera.position.applyAxisAngle(new THREE.Vector3(1, 0, 0), -angle);
        break;
      case "bottom":
        this.camera.position.applyAxisAngle(new THREE.Vector3(1, 0, 0), angle);
        break;
      case "right":
        this.camera.position.applyAxisAngle(new THREE.Vector3(0, 1, 0), -angle);
        break;
      case "left":
        this.camera.position.applyAxisAngle(new THREE.Vector3(0, 1, 0), angle);
        break;
      case "home": // Reset to default position
        this.homeView(true);
        break;
    }

    this.camera.lookAt(0, 0, 0);
    this.controls.update();
  }

  initEventListeners() {
    // Handle file uploads via the drop zone
    this.fullScreenDropZone.addEventListener(
      "click",
      this.handleDropZoneBtnClick.bind(this),
    );
    // Handle drag-and-drop uploads
    this.fullScreenDropZone.addEventListener(
      "dragover",
      this.handleDropZoneDragOver.bind(this),
    );
    this.fullScreenDropZone.addEventListener(
      "dragleave",
      this.handleDropZoneDragLeave.bind(this),
    );
    this.fullScreenDropZone.addEventListener(
      "drop",
      this.handleDropZoneDrop.bind(this),
    );
    // Handle file uploads via the smaller-drop zone
    this.smallerDropZone.addEventListener(
      "click",
      this.handleDropZoneBtnClick.bind(this),
    );

    this.smallerDropZone.addEventListener(
      "dragover",
      this.handleDropZoneDragOver.bind(this),
    );
    this.smallerDropZone.addEventListener(
      "dragleave",
      this.handleDropZoneDragLeave.bind(this),
    );
    this.smallerDropZone.addEventListener(
      "drop",
      this.handleDropZoneDrop.bind(this),
    );

    // Handle view panel button clicks
    const viewContainer = document.getElementById("viewButtonGrid");
    viewContainer.querySelectorAll(".primary-button").forEach((button) => {
      button.addEventListener(
        "click",
        this.handleViewButton.bind(this, button.getAttribute("data-view")),
      );
    });
  }
}
