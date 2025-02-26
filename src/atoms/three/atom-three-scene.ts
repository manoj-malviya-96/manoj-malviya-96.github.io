import * as THREE from "three";
import { Atom3DMesh } from "./atom-three-mesh";

export class Atom3DScene {
  private readonly scene: THREE.Scene;
  private readonly camera: THREE.PerspectiveCamera;
  private renderer: THREE.WebGLRenderer | null = null;
  private meshes: Atom3DMesh[] = [];
  private canvas: HTMLCanvasElement | null = null;

  constructor() {
    this.scene = new THREE.Scene();

    this.camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000,
    );

    this.camera.position.z = 5;

    window.addEventListener("resize", this.onWindowResize.bind(this));
  }

  public initRenderer() {
    if (!this.canvas) {
      throw new Error("Canvas not initialized");
    }
    this.renderer = new THREE.WebGLRenderer({
      canvas: this.canvas,
      antialias: true,
    });
    this.renderer.setSize(window.innerWidth, window.innerHeight);
  }

  public setCanvas(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
  }

  private onWindowResize() {
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();
    this.renderer?.setSize(window.innerWidth, window.innerHeight);
  }

  public addMesh(mesh: Atom3DMesh) {
    this.meshes.push(mesh);
    mesh.init(this.scene);
  }

  public animate() {
    if (!this.renderer) {
      throw new Error("Renderer not initialized");
    }

    requestAnimationFrame(this.animate.bind(this));
    this.meshes.forEach((mesh) => mesh.update());
    this.renderer.render(this.scene, this.camera);
  }
}

export default Atom3DScene;
