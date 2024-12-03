import {CanvasController} from "../../../base/canvas";
import {audioFFTSize, computeDropLevel} from "../../../utils/audio";
import {adjustColor, randomColor, whiteColor} from "../../../utils/color";
import {FibonacciGenerator} from "../../../utils/math";

export const VisualizerOptions = Object.freeze({
    Spiral: 0,
    Bar: 1,
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

export class SpiralVisualizer extends CanvasController {
    constructor({analyser, dataArray, canvasRef}) {
        super(canvasRef);
        this.analyser = analyser; // Audio analyser node
        this.dataArray = dataArray; // Frequency data array

        this.angle = 0;
        this.points = []; // Stores current visible points
        this.totalPoints = 0; // Counter to keep track of points generated

        this.usualRadius = 0.5;
        this.maxGlow = 69; // Max glow intensity
        this.padding = 47; // Padding to keep points in view

        this.fibGenerator = new FibonacciGenerator();
    }

    addNewFibonacciPoint(radius){
        const fibRadius = this.fibGenerator.next() * 5; // Scale the Fibonacci radius
        const angleOffset = this.totalPoints * 0.5; // Angle spacing for points

        this.points.push({
            x: fibRadius * Math.cos(angleOffset),
            y: fibRadius * Math.sin(angleOffset),
            r: radius, // Start with initial radius
            angle: angleOffset, // Save angle for future movement
        });
    };

    updatePoint(point) {
        point.r *= 1.0069; // Expand the radius over time
        point.x = this.padding * point.r * Math.cos(point.angle); // Update x position
        point.y = this.padding * point.r * Math.sin(point.angle); // Update y position
    }

    drawPoint(ctx, point, index, dropLevel, minOpacity = 0.0){
        const { x, y, r } = point;

        // Get the intensity from audio data
        const intensity =
            this.dataArray[(this.totalPoints - index) % this.analyser.frequencyBinCount] / audioFFTSize;
        const factor = intensity ** 3;
        const glow = factor * this.maxGlow;

        // Draw a circle with a glow effect based on audio intensity
        ctx.beginPath();
        ctx.arc(x, y, (1 + dropLevel) * r, 0, Math.PI * 2);

        let color = whiteColor;
        if (factor > 0.55 && dropLevel > 0.47) {
            color = randomColor();
        }

        const drawColor = adjustColor(
            color,
            minOpacity + factor,
            1 + factor ** 2 + minOpacity,
        );

        ctx.shadowBlur = glow;
        ctx.shadowColor = drawColor;
        ctx.fillStyle = drawColor;
        ctx.fill();
    };

    draw() {
        if (!this.canvasRef.current || !this.analyser || !this.dataArray) return;

        const canvas = this.canvasRef.current;
        const ctx = canvas.getContext("2d");
        const {width, height} = canvas;
        ctx.clearRect(0, 0, width, height);

        ctx.save();
        ctx.translate(width / 2, height / 2); // Move origin to center
        ctx.rotate(this.angle); // Apply rotation

        const dropLevel = computeDropLevel(this.dataArray);

        // Draw and update each point
        this.points.forEach((point, index) => {
            this.drawPoint(ctx, point, index, dropLevel, 0.0); // Draw the point
            this.updatePoint(point); // Update the position
        });

        // Remove points that are out of view
        this.points = this.points.filter((point) => point.r < width * 2);
        this.addNewFibonacciPoint(this.usualRadius); // Add a new point
        this.totalPoints++;

        // Restore canvas state and adjust angle for rotation
        ctx.restore();
        this.angle += (dropLevel > 0.5 ? 2 : 1) * 0.03; // Increment rotation angle
    }
}