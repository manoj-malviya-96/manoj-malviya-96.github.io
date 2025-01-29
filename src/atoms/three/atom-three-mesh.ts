import * as THREE from "three";
import { degToRad, radToDeg } from "../../common/math";

export abstract class Atom3DMesh {
  protected scene!: THREE.Scene;
  protected mesh!: THREE.Mesh;

  init(scene: THREE.Scene) {
    this.scene = scene;
    this.create();
  }

  abstract create(): void;

  rotateX(angle: number) {
    this.mesh.rotation.x += degToRad(angle);
  }

  rotateY(angle: number) {
    this.mesh.rotation.y += degToRad(angle);
  }

  rotateZ(angle: number) {
    this.mesh.rotation.z += degToRad(angle);
  }

  translateX(distance: number) {
    this.mesh.position.x += distance;
  }

  translateY(distance: number) {
    this.mesh.position.y += distance;
  }

  translateZ(distance: number) {
    this.mesh.position.z += distance;
  }

  abstract update(): void;
}

export default Atom3DMesh;

export class ExampleCubeMesh extends Atom3DMesh {
  create() {
    const geometry = new THREE.BoxGeometry();
    const material = new THREE.MeshBasicMaterial({ color: "gray" });
    this.mesh = new THREE.Mesh(geometry, material);
    this.scene.add(this.mesh);
  }

  update() {
    this.rotateX(1);
    this.rotateY(1);
  }
}
