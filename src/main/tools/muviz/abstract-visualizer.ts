import { AnalyzerBufferSize } from "../../../common/audio";
import {
  BaseVisualizer,
  MuvizAppColor1,
  MuvizAppColor2,
} from "./base-visualizer";

export class AbstractVisualizer extends BaseVisualizer {
  private angle: number;
  private points: any[];
  private totalPoints: number;
  private readonly growthRate: number;
  private readonly maxGlow: number;
  private canvasWidth: number;
  private canvasHeight: number;

  constructor() {
    super();

    // Spiral properties
    this.angle = 0; // Rotation angle of the spiral
    this.points = []; // Active points in the spiral
    this.totalPoints = 0; // Number of points added so far

    this.growthRate = 18; // Distance between consecutive points
    this.maxGlow = 21; // Maximum glow intensity

    this.canvasWidth = 0; // Cached canvas width
    this.canvasHeight = 0; // Cached canvas height
  }

  init() {
    // Cache canvas dimensions
    if (!this.canvasRef) {
      return;
    }

    const canvas = this.canvasRef.current;
    if (canvas) {
      this.canvasWidth = canvas.width;
      this.canvasHeight = canvas.height;
    }
    console.debug("AbstractViz initialized.");
  }

  addPoint() {
    const angle = this.totalPoints;
    const distance = this.totalPoints * this.growthRate;
    this.points.push({
      x: distance * Math.cos(angle),
      y: distance * Math.sin(angle),
      size: 2.0,
      angle: angle,
    });

    this.totalPoints++;
  }

  updatePoints(speed = 1) {
    this.points.forEach((point) => {
      point.size *= 1 + 0.47 * speed;
      point.x = 69 * point.size * Math.cos(point.angle);
      point.y = 69 * point.size * Math.sin(point.angle);
    });

    // Remove points that move out of bounds
    this.points = this.points.filter(
      (point) =>
        Math.abs(point.x) < this.canvasWidth &&
        Math.abs(point.y) < this.canvasHeight,
    );
  }

  drawPoints(
    ctx: CanvasRenderingContext2D | null,
    intensity: number,
    richness: number,
    centroid: number,
  ) {
    if (!ctx) {
      return;
    }

    const glow = intensity * this.maxGlow;
    const color =
      intensity > 0.4 && intensity < 20
        ? MuvizAppColor1
        : intensity <= 0.4 || richness < 0.5
          ? MuvizAppColor2
          : "white";

    this.points.forEach((point) => {
      const randomGuess = Math.random();
      if (randomGuess > intensity) {
        return;
      }

      const size =
        randomGuess < 2 * centroid
          ? point.size * ((point.size * intensity) / 64)
          : point.size;

      // Draw the point
      ctx.beginPath();
      ctx.arc(point.x, point.y, size, 0, Math.PI * 2);
      ctx.closePath();

      ctx.shadowBlur = glow;
      ctx.shadowColor = color;
      ctx.fillStyle = color;
      ctx.fill();
    });
  }

  draw() {
    if (!this.canvasRef) {
      console.error("No canvas ref");
      return;
    }

    const canvas = this.canvasRef.current;
    if (!canvas) {
      console.error("No Canvas");
      return;
    }
    const ctx = canvas.getContext("2d");
    if (!ctx) {
      console.error("Cannot resolve context");
      return;
    }

    const features = this.features;
    if (!features) {
      console.error("No features detected");
      return;
    }

    ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
    ctx.save();
    ctx.translate(this.canvasWidth / 2, this.canvasHeight / 2);
    ctx.rotate(this.angle);
    this.updatePoints(features.spectralFlatness);
    this.addPoint();

    const centroidNormalized = features.zcr / (AnalyzerBufferSize / 2);

    this.drawPoints(
      ctx,
      features.energy,
      features.perceptualSpread,
      centroidNormalized,
    );

    //! Central Po`int
    ctx.beginPath();
    ctx.arc(0, 0, 69 + 10 * centroidNormalized, 0, Math.PI * 2);
    ctx.closePath();
    ctx.fill();

    ctx.restore();
    this.angle += 0.005 * features.perceptualSharpness;
  }

  cleanup() {
    console.debug("AbstractViz cleanup");
    this.angle = 0;
    this.points = [];
    this.totalPoints = 0;
    this.features = undefined;
  }
}
