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

class MeshView {
  constructor() {
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000,
    );
    this.renderer = new THREE.WebGLRenderer();
    this.renderer.setSize(window.innerWidth, window.innerHeight);

    const existingCanvas = document.getElementById("meshCanvas");
    if (existingCanvas) {
      document.body.replaceChild(this.renderer.domElement, existingCanvas);
    } else {
      document.body.appendChild(this.renderer.domElement);
    }

    // Add light sources
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(5, 5, 5).normalize();
    this.scene.add(directionalLight);

    const ambientLight = new THREE.AmbientLight(0x404040); // Soft light
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

    this.camera.position.set(0, 0, 20);
    this.meshLoader = new MeshLoader();
    this.meshRenderer = new MeshRenderer(this.scene);

    this.infoPanel = document.getElementById("infoPanel");
    this.loadingText = document.getElementById("loading");
    this.dropZone = document.getElementById("dropZone");
    this.toggleBtn = window.document.getElementById("toggleViewBar");
    this.appController = window.document.querySelector(".app-controller");
    this.initEventListeners();
    this.toggleAppController();
  }

  loadMesh(arrayBuffer) {
    const geometry = this.meshLoader.load(arrayBuffer);
    const material = new THREE.MeshPhongMaterial({ color: 0x808080 }); // Gray color for the model
    const mesh = this.meshRenderer.renderMesh(geometry, material);

    // Compute the centroid and volume of the mesh
    const centroid = this.meshLoader.computeAccurateCentroid(geometry);
    const volume = this.meshLoader.computeVolume(geometry);
    mesh.geometry.translate(-centroid.x, -centroid.y, -centroid.z); // Center the mesh

    this.meshRenderer.addCentroidPoint(new THREE.Vector3(0, 0, 0));
    this.controls.target.set(0, 0, 0);
    this.controls.update();

    // Update information panel
    this.infoPanel.style.display = "block";
    this.dropZone.classList.add("small"); // Restrict drop zone to the bottom panel
    this.loadingText.style.display = "none";
    document.getElementById("info-volume").innerText =
      `Volume: ${volume.toFixed(2)}`;
    document.getElementById("info-triangles").innerText =
      `Number of Triangles: ${geometry.index ? geometry.index.count / 3 : geometry.attributes.position.count / 3}`;
  }

  animate() {
    requestAnimationFrame(() => this.animate());
    this.controls.update();
    this.renderer.render(this.scene, this.camera);
  }

  toggleAppController() {
    this.appController.classList.toggle("hidden");
    this.toggleBtn.innerHTML = this.appController.classList.contains("hidden")
      ? '<i class="bi bi-chevron-compact-up"></i>'
      : '<i class="bi bi-chevron-compact-down"></i>';
  }

  initEventListeners() {
    this.toggleBtn.addEventListener(
      "click",
      this.toggleAppController.bind(this),
    );

    // Handle file uploads via the drop zone
    this.dropZone.addEventListener("click", () => {
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
    });

    // Handle drag-and-drop uploads
    this.dropZone.addEventListener("dragover", (event) => {
      event.preventDefault();
      this.dropZone.classList.add("active");
      this.dropZone.style.borderColor = "#777";
      this.dropZone.style.color = "#777";
    });

    this.dropZone.addEventListener("dragleave", (event) => {
      event.preventDefault();
      this.dropZone.classList.remove("active");
      this.dropZone.style.borderColor = "#aaa";
      this.dropZone.style.color = "#aaa";
    });

    this.dropZone.addEventListener("drop", (event) => {
      event.preventDefault();
      this.dropZone.classList.remove("active");
      this.loadingText.style.display = "block";

      const file = event.dataTransfer.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          this.loadMesh(e.target.result);
        };
        reader.readAsArrayBuffer(file);
      }
    });

    // Handle view panel button clicks
    const viewContainer = document.getElementById("viewButtonGrid");
    viewContainer.querySelectorAll(".primary-button").forEach((button) => {
      button.addEventListener("click", () => {
        const view = button.getAttribute("data-view");
        switch (view) {
          case "top":
            this.camera.position.set(0, 10, 0);
            break;
          case "front":
            this.camera.position.set(0, 0, 10);
            break;
          case "right":
            this.camera.position.set(10, 0, 0);
            break;
          case "left":
            this.camera.position.set(-10, 0, 0);
            break;
          case "back":
            this.camera.position.set(0, 0, -10);
            break;
          case "bottom":
            this.camera.position.set(0, -10, 0);
            break;
        }
        this.camera.lookAt(0, 0, 0);
        this.controls.update();
      });
    });
  }
}
