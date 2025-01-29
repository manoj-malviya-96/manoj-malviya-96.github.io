import * as THREE from "three";

export abstract class Atom3DMesh {
  protected scene!: THREE.Scene;
  protected mesh!: THREE.Mesh;

  init(scene: THREE.Scene) {
    this.scene = scene;
    this.create();
  }

  abstract create(): void;

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
    this.mesh.rotation.x += 0.01;
    this.mesh.rotation.y += 0.01;
  }
}
