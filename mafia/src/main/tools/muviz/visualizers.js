import {CanvasController} from "../../../base/canvas";

export const VisualizerOptions = Object.freeze({
    Bar: 0,
    String: 1,
    Spiral: 2,
    Circle: 3,
})

export class BarVisualizer extends CanvasController {
    constructor({analyser, dataArray, canvasRef}) {
        super(canvasRef);
        this.analyser = analyser; // Audio analyser node
        this.dataArray = dataArray; // Frequency data array
    }

    draw() {
        if (!this.canvasRef.current || !this.analyser || !this.dataArray) return;

        const canvas = this.canvasRef.current;
        const ctx = canvas.getContext("2d");
        const {width, height} = canvas;

        ctx.clearRect(0, 0, width, height);

        this.analyser.getByteFrequencyData(this.dataArray);

        const barWidth = width / this.dataArray.length;
        this.dataArray.forEach((value, index) => {
            const barHeight = (value / 255) * height;
            ctx.fillStyle = `rgb(${value}, 50, 200)`;
            ctx.fillRect(index * barWidth, height - barHeight, barWidth, barHeight);
        });
    }
}