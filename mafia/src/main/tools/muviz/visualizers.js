import {CanvasController} from "../../../atoms/canvas";
import {DropDetector} from "../../../utils/audio";
import {adjustColor} from "../../../utils/color";

export const VisualizerOptions = Object.freeze({
    Bar: 0,
    Spiral: 1,
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

        this.analyser = analyser;
        this.dataArray = dataArray;

        // Spiral properties
        this.angle = 0; // Rotation angle of the spiral
        this.points = []; // Active points in the spiral
        this.totalPoints = 0; // Number of points added so far

        this.growthRate = 8; // Distance between consecutive points
        this.maxGlow = 69; // Maximum glow intensity

        this.canvasWidth = 0; // Cached canvas width
        this.canvasHeight = 0; // Cached canvas height

        this.baseColor = `rgb(200, 50, 150)`;

        this.dropDetector = new DropDetector({sampleRate: 44000});
    }

    init() {
        // Cache canvas dimensions
        const canvas = this.canvasRef.current;
        if (canvas) {
            this.canvasWidth = canvas.width;
            this.canvasHeight = canvas.height;
        }
        console.log("SpiralVisualizer initialized.");
    }

    addPoint() {
        const angle = this.totalPoints * 0.5; // Spiral angle increment
        const distance = this.totalPoints * this.growthRate; // Distance from center

        // Add a new point to the spiral
        this.points.push({
            x: distance * Math.cos(angle),
            y: distance * Math.sin(angle),
            size: 0.5, // Initial visual size of the point
            angle: angle, // Angle of the point in the spiral
        });

        this.totalPoints++;
    }

    updatePoints(randomFactor = 0.0) {
        const w = 1 - randomFactor;
        // Update each point's position and size
        this.points.forEach((point) => {
            point.size *= 1.0069; // Gradual size increase
            point.x = (w + randomFactor * Math.random()) * 50 * point.size * Math.cos(point.angle); // Update x position
            point.y = (w + randomFactor * Math.random()) * 50 * point.size * Math.sin(point.angle); // Update y position
        });

        // Remove points that move out of bounds
        this.points = this.points.filter(
            (point) =>
                Math.abs(point.x) < this.canvasWidth && Math.abs(point.y) < this.canvasHeight
        );
    }

    drawPoints(ctx) {
        // Fetch audio data
        this.analyser.getByteFrequencyData(this.dataArray);

        this.points.forEach((point, index) => {
            // Map audio data to intensity
            const soundLevel = this.dataArray[index % this.dataArray.length] / 255;
            const intensity = soundLevel ** 2;

            // Set point properties based on audio intensity
            const glow = intensity * this.maxGlow;
            const brightnessVector = intensity > 0.9 ? [100, 100, 100] : [intensity, 1, 1 + 0.67 * intensity];
            const color = adjustColor(this.baseColor, intensity + 0.5, brightnessVector);

            // Draw the point
            ctx.beginPath();
            ctx.arc(point.x, point.y, point.size * (intensity > 0.8 ? 2 : 1), 0, Math.PI * 2);

            ctx.shadowBlur = glow;
            ctx.shadowColor = color;
            ctx.fillStyle = color;
            ctx.fill();
        });
    }

    draw() {
        const canvas = this.canvasRef.current;
        if (!canvas || !this.analyser || !this.dataArray) return;
        const ctx = canvas.getContext("2d");
        ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeight); // Clear the canvas
        ctx.save();
        ctx.translate(this.canvasWidth / 2, this.canvasHeight / 2); // Move the origin to the center of the canvas
        ctx.rotate(this.angle); // Apply rotation


        const isDrop = this.dropDetector.detect(this.dataArray);
        console.log("isDrop: ", isDrop);

        // Update and draw points
        this.updatePoints(isDrop ? 0.05: 0.0);
        this.addPoint();
        this.drawPoints(ctx);
        ctx.restore();

        // Increment rotation angle for smooth animation
        this.angle += (isDrop ? 2 : 1) * 0.005;
    }
}


