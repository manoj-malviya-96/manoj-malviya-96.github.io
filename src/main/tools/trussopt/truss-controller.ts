import { useEffect, useState } from "react";
import TrussMesh, { LatticeType } from "./truss-mesh";
import { AtomCanvasController } from "../../../atoms/canvas/atom-canvas-controller";
import TrussFea from "./truss-fea";
import { adjustColor, makeColorScale } from "../../../common/color-utils";
import { drawArrow, drawX } from "../../../common/canvas-drawer";

export enum MouseMode {
  None,
  AddForce,
  AddFixed,
}

export class TrussStructureView extends AtomCanvasController {
  private mesh: TrussMesh | null;
  trussColor: string;
  private toCanvasCoords = (x: number, y: number) => [x, y];
  private fromCanvasCoords = (x: number, y: number) => [x, y];
  private readonly maxLineWidth: number = 7;
  private readonly pointRadius: number = 5;
  private readonly arrowWidth: number = 7;
  private readonly arrowLength: number = 50;
  private readonly fixedScalePoint: number = 1.5;
  private readonly forceColor: string = "red";
  private readonly fixedColor: string = "purple";
  feaEngine: TrussFea | null;

  constructor() {
    super();
    this.isStatic = true;
    this.mesh = null;
    this.trussColor = "white";
    this.feaEngine = null;
  }

  init() {}

  cleanup() {}

  updateMesh(mesh: TrussMesh | null) {
    this.mesh = mesh;
    this.updateTransformationFunctions();
    this.draw();
  }

  addFeaResults(feaEngine: TrussFea | null) {
    this.feaEngine = feaEngine;
    this.draw();
  }

  updateTransformationFunctions() {
    if (!this.canvasRef) {
      return;
    }
    if (!this.mesh) {
      return;
    }
    const { meshWidth, meshHeight } = this.mesh;
    const canvas = this.canvasRef.current;
    if (!canvas) {
      console.error("Canvas not defined");
      return;
    }
    const { width, height } = canvas;
    const offset = 10;
    // 0.** is random magic number - to make it not super-big and get clipped by edges
    const factor = 0.9 * Math.min(width / meshWidth, height / meshHeight);

    this.toCanvasCoords = (x: number, y: number) => [
      factor * x + offset,
      factor * y + offset,
    ];
    this.fromCanvasCoords = (x: number, y: number) => [
      x / factor - offset,
      y / factor - offset,
    ];
  }

  draw() {
    if (!this.canvasRef) {
      return;
    }
    if (!this.canvasRef.current || !this.mesh) {
      return;
    }
    if (!this.mesh) {
      return;
    }
    if (!this.trussColor) {
      console.error("No color defined");
      return;
    }

    const canvas = this.canvasRef.current;
    const ctx = canvas.getContext("2d");

    // Ensure the context is not null
    if (!ctx) {
      console.error("2D context could not be retrieved from canvas.");
      return;
    }

    const { width, height } = canvas;
    ctx.clearRect(0, 0, width, height);

    const ogPoints = this.mesh.points;
    const points = ogPoints.map(([x, y]) => this.toCanvasCoords(x, y));

    const edges = this.mesh.connections;
    const thickness = this.mesh.normThickness;
    if (this.feaEngine) {
      const displacements = this.feaEngine.displacements;
      const stresses = this.feaEngine.stresses;
      const nDof = this.feaEngine.ndof_per_node;
      const displacementScale = 0.5;

      const maxStress = Math.max(...stresses);
      const minStress = Math.min(...stresses);
      const normalizeStress = (stress: number) =>
        (stress - minStress) / (maxStress - minStress);
      const colorScale = makeColorScale("blue", "grey", "red");

      if (!displacements) {
        throw new Error("What the hell");
      }
      const displacedPoints = points.map(([x, y], idx) => [
        x + displacementScale * (displacements[idx * nDof] || 0),
        y + displacementScale * (displacements[idx * nDof + 1] || 0),
      ]);

      // Draw displaced mesh
      edges.forEach(([start, end], idx) => {
        const [x1, y1] = displacedPoints[start];
        const [x2, y2] = displacedPoints[end];
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.strokeStyle = colorScale(normalizeStress(stresses[idx]));
        ctx.lineWidth = this.maxLineWidth * thickness[idx];
        ctx.stroke();
        ctx.setLineDash([]); // Reset to solid line
        ctx.closePath();
      });
    }

    const normalColor = this.feaEngine
      ? adjustColor(this.trussColor, 0.069)
      : this.trussColor;

    edges.forEach(([start, end], idx) => {
      const [x1, y1] = points[start];
      const [x2, y2] = points[end];
      ctx.beginPath();
      ctx.moveTo(x1, y1);
      ctx.lineTo(x2, y2);
      ctx.strokeStyle = normalColor;
      ctx.lineWidth = this.maxLineWidth * thickness[idx];
      ctx.stroke();
      ctx.closePath();
    });

    points.forEach(([x, y]) => {
      ctx.beginPath();
      ctx.arc(x, y, this.pointRadius, 0, 2 * Math.PI);
      ctx.fillStyle = normalColor;
      ctx.fill();
      ctx.closePath();
    });

    // get force points
    const forcePointsX = this.mesh.forcePoints_X;
    if (forcePointsX.size > 0) {
      forcePointsX.forEach((idx) => {
        drawArrow(
          ctx,
          points[idx][0],
          points[idx][1],
          this.arrowLength,
          0,
          this.forceColor,
          this.arrowWidth,
        );
      });
    }

    const forcePointsY = this.mesh.forcePoints_Y;
    if (forcePointsY.size > 0) {
      forcePointsY.forEach((idx) => {
        drawArrow(
          ctx,
          points[idx][0],
          points[idx][1],
          this.arrowLength,
          Math.PI / 2,
          this.forceColor,
          this.arrowWidth,
        );
      });
    }

    const fixedPoints = this.mesh.fixedPoints;
    if (fixedPoints.size > 0) {
      fixedPoints.forEach((idx) => {
        drawX(
          ctx,
          points[idx][0],
          points[idx][1],
          this.fixedScalePoint * this.pointRadius,
          this.fixedColor,
          1.5 * this.pointRadius,
        );
      });
    }
  }

  updateMouseMode(mouseMode: MouseMode) {
    if (!this.canvasRef || !this.canvasRef.current) {
      return;
    }

    this.cleanup();
    const canvas = this.canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) {
      return;
    }
    const rect = canvas.getBoundingClientRect();
    const handleMouseDown = (event: MouseEvent) => {
      const mouseX = event.clientX - rect.x;
      const mouseY = event.clientY - rect.y;
      const [x, y] = this.fromCanvasCoords(mouseX, mouseY);
      switch (mouseMode) {
        case MouseMode.AddFixed:
          this.mesh?.addFixNode(x, y);
          break;
        case MouseMode.AddForce:
          this.mesh?.addForceNode(x, y);
          break;
        default:
          console.error("Unknown mouse mode");
          break;
      }
      this.draw();
    };

    canvas.addEventListener("mousedown", handleMouseDown);

    this.cleanup = () => {
      canvas.removeEventListener("mousedown", handleMouseDown);
    };
  }
}

export const useTrussOpt = () => {
  // Defaults
  const [meshWidth, setMeshWidth] = useState<number>(60);
  const [meshHeight, setMeshHeight] = useState<number>(20);
  const [cellSize, setCellSize] = useState<number>(10);
  const [latticeType, setLatticeType] = useState<LatticeType>(
    LatticeType.Cross,
  );
  const [mesh, setMesh] = useState<TrussMesh | null>(null);

  useEffect(() => {
    setMesh(
      new TrussMesh({
        meshWidth: meshWidth,
        meshHeight: meshHeight,
        cellSize: cellSize,
        latticeType: latticeType,
      }),
    );
  }, [meshWidth, meshHeight, cellSize, latticeType]);

  return {
    meshWidth,
    setMeshWidth,
    meshHeight,
    setMeshHeight,
    cellSize,
    setCellSize,
    latticeType,
    setLatticeType,
    mesh,
  };
};
