import {AtomCanvasController} from "../../../atoms/atom-canvas";
import {AudioFeatures} from "../../../common/audio";
import {adjustColor} from "../../../common/color-utils";

const AppColor = `rgb(47, 114, 214)`;

export enum VisualizerType {
	Abstract = 0,
	Spiral = 1
}

export class BaseVisualizer extends AtomCanvasController {
	protected features: AudioFeatures | undefined;
	
	constructor() {
		super();
		this.features = undefined;
	}
	
	update(features: AudioFeatures) {
		this.features = features;
	}
}

export class AbstractVisualizer extends BaseVisualizer {
	private angle: number;
	private points: any[];
	private totalPoints: number;
	private readonly growthRate: number;
	private readonly maxGlow: number;
	private canvasWidth: number;
	private canvasHeight: number;
	
	constructor() {
		super();
		
		// Spiral properties
		this.angle = 0; // Rotation angle of the spiral
		this.points = []; // Active points in the spiral
		this.totalPoints = 0; // Number of points added so far
		
		this.growthRate = 8; // Distance between consecutive points
		this.maxGlow = 47; // Maximum glow intensity
		
		this.canvasWidth = 0; // Cached canvas width
		this.canvasHeight = 0; // Cached canvas height
	}
	
	init() {
		// Cache canvas dimensions
		if (!this.canvasRef) {
			return;
		}
		
		const canvas = this.canvasRef.current;
		if (canvas) {
			this.canvasWidth = canvas.width;
			this.canvasHeight = canvas.height;
		}
		console.log("AbstractViz initialized.");
	}
	
	addPoint() {
		const angle = this.totalPoints;
		const distance = this.totalPoints * this.growthRate;
		this.points.push({
			x: distance * Math.cos(angle),
			y: distance * Math.sin(angle),
			size: 5.0,
			angle: angle,
		});
		
		this.totalPoints++;
	}
	
	updatePoints() {
		this.points.forEach((point) => {
			point.size *= 1.0069;
			point.x = 50 * point.size * Math.cos(point.angle);
			point.y = 50 * point.size * Math.sin(point.angle);
		});
		
		// Remove points that move out of bounds
		this.points = this.points.filter(
			(point) =>
				Math.abs(point.x) < this.canvasWidth && Math.abs(point.y) < this.canvasHeight
		);
	}
	
	drawPoints(ctx: CanvasRenderingContext2D | null, intensity: number, richness: number) {
		if (!ctx) {
			return;
		}
		
		const glow = intensity * this.maxGlow;
		const color = intensity < 6.9 ? adjustColor(AppColor, richness, [intensity, 1 + 0.05 * intensity, 1]): 'white';
		
		this.points.forEach((point)=> {
			// Draw the point
			ctx.beginPath();
			ctx.arc(point.x, point.y, point.size * (point.size * intensity / 64), 0, Math.PI * 2);
			
			ctx.shadowBlur = glow;
			ctx.shadowColor = color;
			ctx.fillStyle = color;
			ctx.fill();
		});
	}
	
	draw() {
		if (!this.canvasRef) {
			console.log("No canvas ref");
			return;
		}
		
		const canvas = this.canvasRef.current;
		if (!canvas){
			console.error("No Canvas")
			return;
		}
		const ctx = canvas.getContext("2d");
		if (!ctx) {
			console.log("Cannot resolve context")
			return;
		}
		
		const features = this.features;
		if (!features){
			console.error("No features detected");
			return ;
		}
		
		ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
		ctx.save();
		ctx.translate(this.canvasWidth / 2, this.canvasHeight / 2);
		ctx.rotate(this.angle);
		this.updatePoints();
		this.addPoint();
		this.drawPoints(ctx, features.energy, features.perceptualSpread);
		ctx.restore();
		this.angle += 0.005 * (features.perceptualSharpness);
	}
}
