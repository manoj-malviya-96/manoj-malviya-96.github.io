import React from "react";

export abstract class AtomCanvasController {
  canvasRef:
    | React.RefObject<HTMLCanvasElement>
    | React.RefObject<null>
    | undefined;
  animationFrameId: number | null;
  isStatic: boolean = true;

  constructor() {
    this.canvasRef = React.createRef();
    this.animationFrameId = null;
  }

  setCanvasRef(
    canvasRef: React.RefObject<HTMLCanvasElement> | React.RefObject<null>,
  ) {
    this.canvasRef = canvasRef;
  }

  abstract init(): void;

  abstract draw(): void;

  abstract cleanup(): void;

  start(): void {
    if (this.animationFrameId) {
      return;
    } // Prevent double looping

    this.init();

    if (this.isStatic) {
      this.draw();
      return;
    }
    const drawLoop = () => {
      this.draw();
      this.animationFrameId = requestAnimationFrame(drawLoop);
    };
    this.animationFrameId = requestAnimationFrame(drawLoop);
  }

  stop(): void {
    if (this.animationFrameId !== null) {
      cancelAnimationFrame(this.animationFrameId);
    }
    this.animationFrameId = null;
    this.cleanup();
  }

  restart(): void {
    this.stop();
    this.start();
  }
}
