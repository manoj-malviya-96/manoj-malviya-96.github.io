import React, { useEffect, useRef, useState } from "react";
import { useTheme } from "../../providers/theme";
import { ScreenSizes, useScreenSizeBreakpoint } from "../../providers/screen";
import { AtomCanvasController } from "./atom-canvas-controller";

interface AtomCanvasProps {
  controller?: AtomCanvasController | null;
  animationLoop?: boolean;
  isLoading?: boolean;
  className?: string;
}

export const AtomCanvas: React.FC<AtomCanvasProps> = React.memo(
  ({
    controller = null,
    isLoading = false,
    animationLoop = true,
    className = "",
  }) => {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const { daisyPrimaryText } = useTheme();
    const breakpoint = useScreenSizeBreakpoint();

    const heightScale = breakpoint === ScreenSizes.Small ? 0.5 : 1;
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

      if (controller && !isLoading) {
        controller.setCanvasRef(
          canvasRef as React.RefObject<HTMLCanvasElement>,
        );
        controller.setStatic(!animationLoop);

        // Restart on song change to ensure fresh drawing
        controller.restart();

        return () => {
          controller.stop();
        };
      }
    }, [controller, isLoading, animationLoop, dimensions]);

    useEffect(() => {
      const handleResize = () => {
        setDimensions({ width: window.innerWidth, height: window.innerHeight });
      };
      window.addEventListener("resize", handleResize);

      return () => {
        window.removeEventListener("resize", handleResize);
      };
    }, []);

    useEffect(() => {
      if (canvasRef.current && isLoading) {
        const ctx = canvasRef.current.getContext("2d");
        if (ctx) {
          ctx.clearRect(
            0,
            0,
            canvasRef.current.width,
            canvasRef.current.height,
          );

          ctx.font = "bold 48px Arial";
          ctx.fillStyle = daisyPrimaryText;
          ctx.textAlign = "center";
          ctx.textBaseline = "middle";

          ctx.fillText(
            "Loading...",
            canvasRef.current.width / 2,
            canvasRef.current.height / 2,
          );
        }
      }
    }, [isLoading, daisyPrimaryText, dimensions]);

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
