export enum LatticeType {
    Cross = "cross",
    Checkerboard = "checkerboard",
}

interface TrussMeshProps {
    cellSize: number;
    meshWidth: number;
    meshHeight: number;
    latticeType: LatticeType;
}


class TrussMesh {
    cellSize: number;
    meshWidth: number;
    meshHeight: number;
    latticeType: LatticeType;
    points: Array<[number, number]>;
    connections: Array<[number, number]>;
    normThickness: number[];
    fixedPoints: Set<number>;
    forcePoints_X: Set<number>;
    forcePoints_Y: Set<number>;
    lengths: number[];
    directionCosines: Array<[number, number]>;
    
    constructor({cellSize, meshWidth, meshHeight, latticeType}: TrussMeshProps) {
        this.cellSize = cellSize;
        this.meshWidth = meshWidth;
        this.meshHeight = meshHeight;
        this.latticeType = latticeType;
        
        this.points = [];
        this.connections = [];
        this.normThickness = [];
        this.lengths = [];
        this.directionCosines = [];
        
        this.fixedPoints = new Set();
        this.forcePoints_X = new Set();
        this.forcePoints_Y = new Set();
        
        this.generateMeshData();
        this.computeLengthAndDirectionCosines();
        this.addCantileverCase();
    }
    
    addCantileverCase() {
        // Add Left most edge as fixed points
        const n_nodes_x = Math.floor(this.meshWidth / this.cellSize);
        const n_nodes_z = Math.floor(this.meshHeight / this.cellSize);
        
        
        for (let i = 0; i <= n_nodes_z; i++) {
            this.fixedPoints.add(i * (
                n_nodes_x + 1
            ));
        }
        
        // Add Right and bottom most corner as force points
        this.forcePoints_Y.add(n_nodes_x);
    }
    
    readyForOptimize() {
        return (
            this.fixedPoints.size > 0 &&
            (
                this.forcePoints_X.size > 0 || this.forcePoints_Y.size > 0
            ) &&
            this.points.length > 0 &&
            this.connections.length > 0
        );
    }
    
    generateMeshData() {
        const n_nodes_x = Math.floor(this.meshWidth / this.cellSize);
        const n_nodes_z = Math.floor(this.meshHeight / this.cellSize);
        
        // Generate points
        for (let z = 0; z <= n_nodes_z; z++) {
            for (let x = 0; x <= n_nodes_x; x++) {
                this.points.push([x * this.cellSize, z * this.cellSize]); // Coordinates in mm
            }
        }
        
        // Generate connections based on lattice type
        for (let i = 0; i < n_nodes_z; i++) {
            for (let j = 0; j < n_nodes_x; j++) {
                const n1 = i * (
                           n_nodes_x + 1
                ) + j;
                const n2 = n1 + 1;
                const n3 = n1 + (
                           n_nodes_x + 1
                );
                const n4 = n3 + 1;
                
                if (this.latticeType === LatticeType.Cross) {
                    this.addConnection(n1, n4);
                    this.addConnection(n2, n3);
                } else if (this.latticeType === LatticeType.Checkerboard) {
                    if ((
                            i + j
                        ) % 2 === 0) {
                        this.addConnection(n1, n4); // Cross-diagonal
                                                    // line
                    } else {
                        this.addConnection(n2, n3); // Opposite-diagonal
                                                    // line
                    }
                }
                this.addConnection(n1, n3);
                this.addConnection(n1, n2);
                this.addConnection(n3, n4);
                
                if (j=== n_nodes_x - 1){
                    this.addConnection(n2, n4);
                }
            }
        }
    }
    
    computeLengthAndDirectionCosines() {
        this.lengths = new Array(this.connections.length).fill(0);
        this.directionCosines = new Array(this.connections.length).fill([0, 0]);
        
        const points = this.points;
        this.connections.forEach(([start, end], index) => {
            const x1 = points[start][0];
            const y1 = points[start][1];
            const x2 = points[end][0];
            const y2 = points[end][1];
            
            const length = Math.hypot(x2 - x1, y2 - y1);
            
            // Calculate direction cosines
            const c = (
                          x2 - x1
                      ) / length;
            const s = (
                          y2 - y1
                      ) / length;
            
            this.lengths[index] = length;
            this.directionCosines[index] = [c, s];
        });
    }
    
    addConnection(start: number, end: number) {
        this.connections.push([start, end]);
        this.normThickness.push(1.0); // Max thickness
    }
    
    findClosestNode(x: number, y: number) {
        let minDist = Infinity;
        let closestNode = -1;
        this.points.forEach((point, index) => {
            const dist = Math.hypot(point[0] - x, point[1] - y);
            if (dist < minDist) {
                minDist = dist;
                closestNode = index;
            }
        });
        return closestNode;
    }
    
    updateFixNode(x: number, y: number) {
        const closestNode = this.findClosestNode(x, y);
        if (closestNode === -1) {
            console.error("No closest node found");
            return;
        }
        if (this.fixedPoints.has(closestNode)) {
            this.fixedPoints.delete(closestNode);
        } else {
            this.fixedPoints.add(closestNode);
        }
    }
    
    updateForceNode(x: number, y: number) {
        const closestNode = this.findClosestNode(x, y);
        if (closestNode === -1) {
            console.error("No closest node found");
            return;
        }
        // Sequence matters. First click is X-Force, Second click is
        // Y-Force, Third is Both, Fourth is None
        if (this.forcePoints_X.has(closestNode)) {
            // If X-Force is already applied, then toggle to Y-Force
            if (this.forcePoints_Y.has(closestNode)) {
                this.forcePoints_Y.delete(closestNode);
            } else {
                this.forcePoints_Y.add(closestNode);
            }
            this.forcePoints_X.delete(closestNode);
        } else {
            this.forcePoints_X.add(closestNode);
        }
    }
    
    computeDisplacedPoints(
        displacements: Array<number>,
        ndof_per_node: number = 2,
        scale: number = 0.01
    ) {
        return this.points.map(([x, y], index) => {
            const start_dof = index * ndof_per_node;
            return [
                x + scale * displacements[start_dof],
                y + scale * displacements[start_dof + 1],
            ];
        });
    }
}

export default TrussMesh;