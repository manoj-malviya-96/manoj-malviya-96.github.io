import {
  BaseVisualizer,
  MuvizAppColor1,
  MuvizAppColor2,
} from "./base-visualizer";
import { AnalyzerBufferSize } from "../../../common/audio";

export class DevModeVisualizer extends BaseVisualizer {
  private canvasWidth: number;
  private canvasHeight: number;

  constructor() {
    super();
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
    console.debug("NewViz initialized.");
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

    // Circle positions (arranged in a circle around the center)
    const radius = 200;
    const positions = [
      { label: "Perceptual Spread", x: centerX + radius, y: centerY },
      { label: "Perceptual Sharpness", x: centerX, y: centerY - radius },
      { label: "Spectral Flatness", x: centerX - radius, y: centerY },
      { label: "zcr", x: centerX, y: centerY + radius },
      {
        label: "Energy",
        x: centerX,
        y: centerY,
      },
    ];

    // Sizes based on features
    const sizes = [
      perceptualSpread * 200,
      perceptualSharpness * 100,
      spectralFlatness * 500,
      (zcr / (AnalyzerBufferSize / 2 - 1)) * 100,
      energy,
    ];

    // Colors for each circle
    const colors = [
      MuvizAppColor1,
      MuvizAppColor2,
      "#FFA500",
      "#4CAF50",
      "#00BFFF",
    ];

    // Draw circles and labels
    positions.forEach((pos, index) => {
      const size = sizes[index];
      const color = colors[index];

      // Draw circle
      ctx.beginPath();
      ctx.arc(pos.x, pos.y, size / 2, 0, 2 * Math.PI);
      ctx.fillStyle = color;
      ctx.fill();
      ctx.closePath();

      // Draw text
      ctx.fillStyle = "#FFFFFF"; // Text color
      ctx.font = "14px Arial";
      ctx.textAlign = "center";
      ctx.fillText(pos.label, pos.x, pos.y + size / 2 + 20); // Offset text below the circle
    });

    console.debug("NewViz drawn with centered circles and labels");
  }

  cleanup() {
    console.debug("NewViz cleanup");
  }
}
