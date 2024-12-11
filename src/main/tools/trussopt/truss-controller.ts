import {useEffect, useState} from "react";
import TrussMesh, {LatticeType} from "./truss-mesh";
import {epsilon} from "numeric";
import {AtomCanvasController} from "../../../atoms/atom-canvas";


export class TrussStructureView extends AtomCanvasController {
    private mesh: TrussMesh | null;
    
    constructor() {
        super();
        this.mesh = null;
    }
    
    updateMesh(mesh: TrussMesh | null) {
        this.mesh = mesh;
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
        
        const canvas = this.canvasRef.current;
        const ctx = canvas.getContext("2d");
        
        // Ensure the context is not null
        if (!ctx) {
            console.error("2D context could not be retrieved from canvas.");
            return;
        }
        let points = this.mesh.points;
        const edges = this.mesh.connections;
        
        const {width, height} = canvas;
        ctx.clearRect(0, 0, width, height);
        const factor = Math.min(width / this.mesh.meshWidth, height / this.mesh.meshHeight);
        
        points = points.map(([x, y]) => [factor * x, factor * y]);
        edges.forEach(([start, end]) => {
            const [x1, y1] = points[start];
            const [x2, y2] = points[end];
            ctx.beginPath();
            ctx.moveTo(x1, y1);
            ctx.lineTo(x2, y2);
            ctx.strokeStyle = "white";
            ctx.stroke();
            ctx.closePath();
        });
        
        points.forEach(([x, y]) => {
            ctx.beginPath();
            ctx.arc(x, y, 6, 0, 2 * Math.PI);
            ctx.fillStyle = "red";
            ctx.fill();
            ctx.closePath();
        });
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
