import React, {useRef, useEffect, useState} from "react";

export class AtomCanvasController {
    canvasRef: React.RefObject<HTMLCanvasElement> | React.RefObject<null> | undefined;
    animationFrameId: number | null;
    makeLoop: boolean = true;
    
    constructor() {
        this.canvasRef = React.createRef();
        this.animationFrameId = null;
        this.makeLoop = false;
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
        
        if (this.makeLoop) {
            drawLoop();
        } else {
            this.draw();
        }
    }
    
    stop(): void {
        if (this.animationFrameId !== null) {
            cancelAnimationFrame(this.animationFrameId);
        }
        this.cleanup();
    }
    
    restart(): void {
        this.stop();
        this.start();
    }
}


interface AtomCanvasProps {
    controller?: AtomCanvasController | null;
    animationLoop?: boolean;
    className?: string;
}

export const AtomCanvas: React.FC<AtomCanvasProps> = ({
                                                          controller = null,
                                                          animationLoop = true,
                                                          className = ""
                                                      }) => {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    
    useEffect(() => {
        if (!controller) {
            if (canvasRef && canvasRef.current) {
                canvasRef.current.textContent = "Canvas, Not available";
            }
            return;
        }
        
        // Assign canvasRef to controller and start it
        controller.setCanvasRef(canvasRef as React.RefObject<HTMLCanvasElement>);
        controller.makeLoop = animationLoop;
        
        // Cleanup on unmount
        return () => {
            controller.stop();
        };
    }, [controller]);
    
    const [dimensions, setDimensions] = useState({
        width: window.innerWidth,
        height: window.innerHeight,
    });
    
    const restartController = () => {
        if (controller) {
            controller.restart();
        }
    }
    
    useEffect(() => {
        const handleResize = () => {
            setDimensions({
                width: window.innerWidth,
                height: window.innerHeight,
            });
            restartController();
        };
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, [setDimensions, restartController]);
    
    return (
        <canvas
            ref={canvasRef}
            width={dimensions.width}
            height={dimensions.height}
            className={`${className}`}
        />
    );
};
