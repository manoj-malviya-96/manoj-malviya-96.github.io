import React, { useEffect, useRef } from "react";
import AtomThreeScene from "./atom-three-scene";
import AtomThreeMesh from "./atom-three-mesh";

interface AtomThreeCanvasProps {
  meshes: AtomThreeMesh[];
  scene: AtomThreeScene;
  className?: string;
}

const AtomThreeCanvas: React.FC<AtomThreeCanvasProps> = ({
  meshes,
  scene,
  className,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (canvasRef.current) {
      scene.setCanvas(canvasRef.current);
      scene.initRenderer();
      scene.animate();
    }
  }, [scene]);

  useEffect(() => {
    if (canvasRef.current) {
      meshes.forEach((mesh) => scene.addMesh(mesh));
    }
  }, [meshes, scene]);

  return (
    <canvas
      ref={canvasRef}
      className={className}
      style={{ width: "100%", height: "100%" }}
    />
  );
};

export default AtomThreeCanvas;
