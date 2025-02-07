import React, { useEffect, useRef } from "react";
import AtomThreeScene from "./atom-three-scene";
import AtomThreeMesh from "./atom-three-mesh";

interface AtomThreeCanvasProps {
  meshes: AtomThreeMesh[];
  className?: string;
}

const AtomThreeCanvas: React.FC<AtomThreeCanvasProps> = ({
  meshes,
  className,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (canvasRef.current) {
      const canvas = new AtomThreeScene(canvasRef.current);
      meshes.forEach((mesh) => canvas.addMesh(mesh));
    }
  }, [meshes]);

  return (
    <canvas
      ref={canvasRef}
      className={className}
      style={{ width: "100%", height: "100%" }}
    />
  );
};

export default AtomThreeCanvas;
