import {useEffect, useState} from "react";
import TrussMesh, {LatticeType} from "./truss-mesh";
import {epsilon} from "numeric";
import {AtomCanvasController} from "../../../atoms/atom-canvas";


export class TrussStructureView extends AtomCanvasController {
    private mesh: TrussMesh | null;
    trussColor: string;
    
    constructor(color: string, mesh: TrussMesh | null) {
        super();
        this.mesh = mesh;
        this.trussColor = color
    }
    
    updateMesh(mesh: TrussMesh | null) {
        this.mesh = mesh;
        this.draw();
    }
    
    draw() {
        if (!this.canvasRef) {
            return;
        }
        if (!this.canvasRef.current || !this.mesh) {
            return;
        }
        if (!this.mesh) {
            return;
        }
        if (!this.trussColor) {
            console.error('No color defined');
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
        
        
        let points = this.mesh.points;
        const edges = this.mesh.connections;
        // 0.** is random magic number - to make it not super-big and get clipped by edges
        const factor = 0.90 * Math.min(width / this.mesh.meshWidth, height / this.mesh.meshHeight);
        const offset = 10
        points = points.map(([x, y]) => [factor * x + offset, factor * y + offset]);
        
        // get force points
        const forcePointsX = this.mesh.forcePoints_X;
        const forcePointsY = this.mesh.forcePoints_Y;
        const fixedPoints = this.mesh.fixedPoints;
        
        edges.forEach(([start, end]) => {
            const [x1, y1] = points[start];
            const [x2, y2] = points[end];
            ctx.beginPath();
            ctx.moveTo(x1, y1);
            ctx.lineTo(x2, y2);
            ctx.strokeStyle = this.trussColor
            ctx.stroke();
            ctx.closePath();
        });
        
        const pointRadius = 6;
        points.forEach(([x, y]) => {
            ctx.beginPath();
            ctx.arc(x, y, pointRadius, 0, 2 * Math.PI);
            ctx.fillStyle = this.trussColor
            ctx.fill();
            ctx.closePath();
        });
        
        if (forcePointsX.size > 0) {
            forcePointsX.forEach((idx) => {
                ctx.beginPath();
                ctx.arc(points[idx][0], points[idx][1], pointRadius, 0, 2 * Math.PI);
                ctx.fillStyle = 'red'
                ctx.fill();
                ctx.closePath();
            });
        }
        
        if (forcePointsY.size > 0) {
            forcePointsY.forEach((idx) => {
                ctx.beginPath();
                ctx.arc(points[idx][0], points[idx][1], pointRadius, 0, 2 * Math.PI);
                ctx.fillStyle = 'orange'
                ctx.fill();
                ctx.closePath();
            });
        }
        
        if (fixedPoints.size > 0) {
            fixedPoints.forEach((idx) => {
                ctx.beginPath();
                ctx.arc(points[idx][0], points[idx][1], pointRadius, 0, 2 * Math.PI);
                ctx.fillStyle = 'blue'
                ctx.fill();
                ctx.closePath();
            });
        }
    }
}

export const useTrussOpt = () => {
    // Defaults
    const [meshWidth, setMeshWidth] = useState<number>(60);
    const [meshHeight, setMeshHeight] = useState<number>(20);
    const [cellSize, setCellSize] = useState<number>(10);
    const [latticeType, setLatticeType] = useState<LatticeType>(LatticeType.Cross);
    const [mesh, setMesh] = useState<TrussMesh | null>(null);
    
    
    useEffect(() => {
        setMesh(new TrussMesh({
            meshWidth: meshWidth,
            meshHeight: meshHeight,
            cellSize: cellSize,
            latticeType: latticeType,
        }));
    }, [meshWidth, meshHeight, cellSize, latticeType]);
    
    return {
        meshWidth, setMeshWidth,
        meshHeight, setMeshHeight,
        cellSize, setCellSize,
        latticeType, setLatticeType,
        mesh,
    }
}
