import React, {useRef, useEffect, useState} from "react";

export class CanvasController {
    constructor(canvasRef) {
        this.canvasRef = canvasRef;
        this.animationFrameId = null;
    }

    init() {
        // To be implemented by subclasses (e.g., setting up resources)
    }

    draw() {
        // To be implemented by subclasses (e.g., drawing logic)
    }

    cleanup() {
        // To be implemented by subclasses (e.g., releasing resources)
    }

    start() {
        const drawLoop = () => {
            this.draw();
            this.animationFrameId = requestAnimationFrame(drawLoop);
        };
        this.init();
        drawLoop();
    }

    stop() {
        if (this.animationFrameId) {
            cancelAnimationFrame(this.animationFrameId);
        }
        this.cleanup();
    }
}

export const Canvas = ({controller = null, className = ""}) => {
    const canvasRef = useRef(null);

    useEffect(() => {
        if (!controller) return;

        // Assign canvasRef to controller and start it
        controller.canvasRef = canvasRef;
        controller.start();

        // Cleanup on unmount
        return () => {
            controller.stop();
        };
    }, [controller]);


    const [dimensions, setDimensions] = useState({
        width: window.innerWidth,
        height: window.innerHeight,
    });

    useEffect(() => {
        const handleResize = () => {
            setDimensions({
                width: window.innerWidth,
                height: window.innerHeight,
            });
        };

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return (
        <canvas
            ref={canvasRef}
            width={dimensions.width}
            height={dimensions.height}
            className={`bg-black ${className}`}
        />
    );
};


