import * as THREE from "three";
import { Atom3DMesh } from "./atom-three-mesh";

export class Atom3DScene {
  private readonly scene: THREE.Scene;
  private readonly camera: THREE.PerspectiveCamera;
  private renderer: THREE.WebGLRenderer;
  private meshes: Atom3DMesh[] = [];
  private readonly canvas: HTMLCanvasElement;

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000,
    );
    this.camera.position.z = 5;
    this.renderer = new THREE.WebGLRenderer({
      canvas: this.canvas,
      antialias: true,
    });
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    window.addEventListener("resize", this.onWindowResize.bind(this));
    this.animate();
  }

  private onWindowResize() {
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
  }

  public addMesh(controller: Atom3DMesh) {
    this.meshes.push(controller);
    controller.init(this.scene);
  }

  private animate() {
    requestAnimationFrame(this.animate.bind(this));
    this.meshes.forEach((mesh) => mesh.update());
    this.renderer.render(this.scene, this.camera);
  }
}

export default Atom3DScene;
