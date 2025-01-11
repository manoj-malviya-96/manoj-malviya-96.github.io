import {AtomCanvasController} from "../../../atoms/atom-canvas";

export enum VisualizerType {
    Bar = 0,
    Spiral = 1
}

export function toString(type: VisualizerType): string {
    switch (type) {
        case VisualizerType.Bar:
            return "Bar";
        case VisualizerType.Spiral:
            return "Spiral";
    }
}

interface VisualizerProps {
    analyser: AnalyserNode;
    dataArray: Uint8Array;
}

export class BaseVisualizer extends AtomCanvasController {
    protected readonly analyser: AnalyserNode;
    protected readonly dataArray: Uint8Array;
    
    constructor({analyser, dataArray}: VisualizerProps) {
        super();
        this.analyser = analyser;
        this.dataArray = dataArray;
    }
}

export class BarVisualizer extends BaseVisualizer {
    
    constructor({analyser, dataArray}: VisualizerProps) {
        super({analyser, dataArray});
    }
    
    draw() {
        
        if (!this.canvasRef) {
            console.error("Canvas reference is null.");
            return;
        }
        if (!this.canvasRef.current || !this.analyser || !this.dataArray) {
            console.error("Canvas, analyser or data array is null.");
            return;
        }
        
        const canvas = this.canvasRef.current;
        const ctx = canvas.getContext("2d");
        
        // Ensure the context is not null
        if (!ctx) {
            console.error("2D context could not be retrieved from canvas.");
            return;
        }
        
        const {width, height} = canvas;
        ctx.clearRect(0, 0, width, height);
        
        this.analyser.getByteFrequencyData(this.dataArray);
        
        const barWidth = width / this.dataArray.length;
        this.dataArray.forEach((value, index) => {
            const barHeight = (
                                  value / 255
                              ) * height;
            ctx.fillStyle = `rgb(${value}, 50, 200)`;
            ctx.fillRect(index * barWidth, height - barHeight, barWidth, barHeight);
        });
    }
}


