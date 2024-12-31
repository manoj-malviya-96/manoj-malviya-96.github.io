import React, {useEffect, useRef, useState} from "react";
import {useTheme} from "../providers/theme";
import {ScreenSizes, useScreenSizeBreakpoint} from "../providers/screen";

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
        this.init();
        
        if (this.makeLoop) {
            const drawLoop = () => {
                this.draw();
                this.animationFrameId = requestAnimationFrame(drawLoop);
            };
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
    isLoading?: boolean;
    className?: string;
}

export const AtomCanvas: React.FC<AtomCanvasProps> = React.memo(({
                                                           controller = null,
                                                           isLoading = false,
                                                           animationLoop = true,
                                                           className = "",
                                                       }) => {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const {daisyPrimaryText} = useTheme();
    const breakpoint = useScreenSizeBreakpoint();
    
    const heightScale = breakpoint === ScreenSizes.Small ? 0.5 : 1;
    const [dimensions, setDimensions] = useState({width: window.innerWidth, height: window.innerHeight * heightScale});
    
    useEffect(() => {
        const resizeCanvas = () => {
            if (canvasRef.current) {
                canvasRef.current.width = dimensions.width;
                canvasRef.current.height = dimensions.height;
            }
        };
        
        resizeCanvas();
        
        if (controller && !isLoading) {
            controller.setCanvasRef(canvasRef as React.RefObject<HTMLCanvasElement>);
            controller.makeLoop = animationLoop;
            controller.start();
            
            return () => {
                controller.stop();
            };
        }
    }, [controller, isLoading, animationLoop, dimensions]);
    
    useEffect(() => {
        const handleResize = () => {
            setDimensions({width: window.innerWidth, height: window.innerHeight});
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
                ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
                
                ctx.font = "bold 48px Arial";
                ctx.fillStyle = daisyPrimaryText;
                ctx.textAlign = "center";
                ctx.textBaseline = "middle";
                
                ctx.fillText(
                    "Loading...",
                    canvasRef.current.width / 2,
                    canvasRef.current.height / 2
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
});

