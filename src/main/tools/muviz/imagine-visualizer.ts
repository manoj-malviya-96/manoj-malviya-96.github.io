import {
  BaseVisualizer,
  MuvizAppColor1,
  MuvizAppColor2,
} from "./base-visualizer";
import { AnalyzerBufferSize } from "../../../common/audio";

export class ImagineVisualizer extends BaseVisualizer {
  private canvasWidth: number;
  private canvasHeight: number;

  constructor() {
    super();
    this.canvasWidth = 0;
    this.canvasHeight = 0;
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

    const {
      perceptualSpread,
      perceptualSharpness,
      spectralFlatness,
      zcr,
      energy,
    } = features;

    ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeight);

    // Center of canvas
    const centerX = this.canvasWidth / 2;
    const centerY = this.canvasHeight / 2;

    const pointRadius = 3 + 0.069 * energy ** 2;
    const maxPoints = 3 + Math.max(24, Math.floor(12 * spectralFlatness));
    const offset = zcr / 50;
    const circleRadius = Math.min(690, 18 + 17 * energy);

    const points = [];
    for (let i = 0; i < maxPoints; i++) {
      const angle = (i * 2 * Math.PI) / maxPoints + offset;
      const randomFactor = perceptualSpread * Math.random();
      const x = centerX + circleRadius * Math.cos(angle) + randomFactor;
      const y = centerY + circleRadius * Math.sin(angle) + randomFactor;
      points.push({ x, y });
    }

    const color =
      energy > 2.0 && energy < 20
        ? MuvizAppColor2
        : energy <= 2.0 || perceptualSpread < 0.5
          ? MuvizAppColor1
          : "white";

    ctx.fillStyle = color;
    ctx.shadowBlur = 21 + 10 * perceptualSharpness;
    ctx.shadowColor = color;

    for (const point of points) {
      ctx.beginPath();
      ctx.arc(point.x, point.y, pointRadius, 0, 2 * Math.PI);
      ctx.fill();
      ctx.closePath();
    }
  }

  cleanup() {}
}
