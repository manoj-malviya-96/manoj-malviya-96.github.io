import React, { useEffect, useRef, useState } from "react";
import {
  ScreenSizeBreakPointAsString,
  useScreenSizeBreakpoint,
} from "../../providers/screen";
import { AtomCanvasController } from "./atom-canvas-controller";

interface AtomCanvasProps {
  controller: AtomCanvasController | null;
  className?: string;
}

export const AtomCanvas: React.FC<AtomCanvasProps> = React.memo(
  ({ controller = null, className = "" }) => {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const breakpoint = useScreenSizeBreakpoint();

    const heightScale =
      breakpoint === ScreenSizeBreakPointAsString.Small ? 0.5 : 1;
    const [dimensions, setDimensions] = useState({
      width: window.innerWidth,
      height: window.innerHeight * heightScale,
    });

    useEffect(() => {
      const resizeCanvas = () => {
        if (canvasRef.current) {
          canvasRef.current.width = dimensions.width;
          canvasRef.current.height = dimensions.height;
        }
      };

      resizeCanvas();

      if (controller) {
        controller.setCanvasRef(
          canvasRef as React.RefObject<HTMLCanvasElement>,
        );

        // Restart on song change to ensure fresh drawing
        controller.restart();

        return () => {
          controller.stop();
        };
      }
    }, [controller, dimensions]);

    useEffect(() => {
      const handleResize = () => {
        setDimensions({ width: window.innerWidth, height: window.innerHeight });
      };
      window.addEventListener("resize", handleResize);

      return () => {
        window.removeEventListener("resize", handleResize);
      };
    }, []);

    return (
      <canvas
        ref={canvasRef}
        className={className}
        style={{
          display: "block",
          width: "100%",
          height: "100%",
        }}
      />
    );
  },
);

export default AtomCanvas;
