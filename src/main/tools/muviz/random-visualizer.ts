import {
  BaseVisualizer,
  MuvizAppColor1,
  MuvizAppColor2,
} from "./base-visualizer";

export class RandomVisualizer extends BaseVisualizer {
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

    const { perceptualSpread, perceptualSharpness, energy } = features;

    ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeight);

    // Center of canvas
    const centerX = this.canvasWidth / 2;
    const centerY = this.canvasHeight / 2;

    const pointRadius = Math.floor(3 + 1.5 * energy);
    const maxPoints = 5 + Math.floor(96 / (0.01 + energy));
    const circleRadius = 128 + 16 * energy ** 2;

    const points = [];
    for (let i = 0; i < maxPoints; i++) {
      const angle = (i * 2 * Math.PI) / maxPoints;
      const randomOffset =
        (1 + 0.5 * perceptualSpread) * Math.random() * perceptualSharpness;
      const x = centerX + circleRadius * Math.cos(angle) * randomOffset;
      const y = centerY + circleRadius * Math.sin(angle) * randomOffset;
      points.push({ x, y });
    }

    const color =
      energy > 2.0 && energy < 13.0
        ? MuvizAppColor1
        : energy <= 2.0
          ? MuvizAppColor2
          : "white";

    ctx.fillStyle = color;
    ctx.shadowBlur = 21;
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
