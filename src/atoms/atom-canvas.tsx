import React, {useRef, useEffect, useState} from "react";

export class AtomCanvasController {
    canvasRef: React.RefObject<HTMLCanvasElement> | React.RefObject<null> | undefined;
    animationFrameId: number | null;
    
    constructor() {
        this.canvasRef = React.createRef();
        this.animationFrameId = null;
    }
    
    setCanvasRef(canvasRef: React.RefObject<HTMLCanvasElement> | React.RefObject<null>) {
        this.canvasRef = canvasRef;
    }
    
    init(): void {
        // To be implemented by subclasses (e.g., setting up
        // resources)
    }
    
    draw(): void {
        // To be implemented by subclasses (e.g., drawing logic)
    }
    
    cleanup(): void {
        // To be implemented by subclasses (e.g., releasing
        // resources)
    }
    
    start(): void {
        const drawLoop = () => {
            this.draw();
            this.animationFrameId = requestAnimationFrame(drawLoop);
        };
        this.init();
        drawLoop();
    }
    
    stop(): void {
        if (this.animationFrameId !== null) {
            cancelAnimationFrame(this.animationFrameId);
        }
        this.cleanup();
    }
}


interface AtomCanvasProps {
    controller?: AtomCanvasController | null;
    className?: string;
}

export const AtomCanvas: React.FC<AtomCanvasProps> = ({
                                                  controller = null,
                                                  className = ""
                                              }) => {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    
    useEffect(() => {
        if (!controller) {
            return;
        }
        
        // Assign canvasRef to controller and start it
        controller.setCanvasRef(canvasRef as React.RefObject<HTMLCanvasElement>);
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
