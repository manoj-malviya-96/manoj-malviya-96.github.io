import TrussMesh from "./truss-mesh";
import numeric from "numeric";
import {roundTo} from "../../../common/math";


export interface TrussFeaResults {
    maxStress: number
    minStress: number
    volume: number
    strainEnergy: number
}

class TrussFea {
    private readonly E: number = 1;
    private readonly ndof: number;
    readonly ndof_per_node: number;
    private mesh: TrussMesh;
    public displacements: number[] | null = null;
    public stresses: number[] = [];
    public strainEnergy: number = 0;
    public derivative_strainEnergy: number[] = [];
    public totalVolume: number = 0;
    public computed: boolean = false;
    
    constructor(mesh: TrussMesh, E: number = 1) {
        this.E = E;
        this.ndof_per_node = 2;
        this.ndof = mesh.points.length * this.ndof_per_node;
        this.mesh = mesh;
    }
    
    compute(): void {
        const K = this.computeGlobalStiffnessMatrix();
        this.applyBoundaryConditions(K);
        const F = this.computeForces();
        const U = this.solveDisplacements(K, F);
        
        if (!U) {
            return;
        }
        
        this.displacements = U;
        this.computeStresses(U);
        this.computeStrainEnergy(U, K);
        this.computeDerivativeStrainEnergy();
        this.computeTotalVolume();
        this.computed = true;
    }
    
    private computeGlobalStiffnessMatrix(): number[][] {
        const K = Array.from({length: this.ndof}, () => Array(this.ndof).fill(0));
        
        this.mesh.connections.forEach(([start, end], index) => {
            const length = this.mesh.lengths[index];
            const A = this.mesh.normThickness[index];
            const k = (
                          this.E * A
                      ) / length;
            
            const [c, s] = this.mesh.directionCosines[index];
            const ke = [
                [c * c * k, c * s * k, -c * c * k, -c * s * k],
                [c * s * k, s * s * k, -c * s * k, -s * s * k],
                [-c * c * k, -c * s * k, c * c * k, c * s * k],
                [-c * s * k, -s * s * k, c * s * k, s * s * k],
            ];
            
            const start_dof = start * this.ndof_per_node;
            const end_dof = end * this.ndof_per_node;
            
            for (let i = 0; i < this.ndof_per_node; i++) {
                for (let j = 0; j < this.ndof_per_node; j++) {
                    K[start_dof + i][start_dof + j] += ke[i][j];
                    K[start_dof + i][end_dof + j] += ke[i][j + 2];
                    K[end_dof + i][start_dof + j] += ke[i + 2][j];
                    K[end_dof + i][end_dof + j] += ke[i + 2][j + 2];
                }
            }
        });
        
        return K;
    }
    
    private applyBoundaryConditions(K: number[][]): void {
        this.mesh.fixedPoints.forEach((index) => {
            const start_dof = index * this.ndof_per_node;
            for (let i = 0; i < this.ndof_per_node; i++) {
                K[start_dof + i].fill(0);
                K[start_dof + i][start_dof + i] = 1;
            }
        });
    }
    
    private computeForces(): number[] {
        const F = new Array(this.ndof).fill(0);
        
        this.mesh.forcePoints_Y.forEach((index) => {
            F[index * this.ndof_per_node + 1] = 1; // Force in y
                                                   // direction
        });
        
        this.mesh.forcePoints_X.forEach((index) => {
            F[index * this.ndof_per_node] = 1; // Force in x
                                               // direction
        });
        
        return F;
    }
    
    private solveDisplacements(K: number[][], F: number[]): number[] | null {
        try {
            return numeric.solve(K, F);
        }
        catch (e) {
            console.error("Error solving for displacements:", e);
            return null;
        }
    }
    
    private computeStresses(U: number[]): void {
        const A = this.mesh.normThickness;
        this.stresses = this.mesh.connections.map(([start, end], i) => {
            if (A[i] <= 0) {
                return 0;
            }
            
            const length = this.mesh.lengths[i];
            const start_dof = start * this.ndof_per_node;
            const end_dof = end * this.ndof_per_node;
            const u1 = [U[start_dof], U[start_dof + 1]];
            const u2 = [U[end_dof], U[end_dof + 1]];
            const deltaU = u2.map((val, idx) => val - u1[idx]);
            const axialForce =
                deltaU[0] * this.mesh.directionCosines[i][0] +
                deltaU[1] * this.mesh.directionCosines[i][1];
            
            return (
                       this.E * axialForce
                   ) / (
                       A[i] * length
                   );
        });
    }
    
    private computeStrainEnergy(U: number[], K: number[][]): void {
        const a = numeric.dot(numeric.dot(U, K), U);
        if (typeof a !== "number") {
            console.error("Error computing strain energy");
            return;
        }
        this.strainEnergy = a / 2;
        return;
    }
    
    private computeDerivativeStrainEnergy(): void {
        const A = this.mesh.normThickness;
        this.derivative_strainEnergy = this.mesh.connections.map((_, i) => {
            const F_i = this.stresses[i] * A[i] * this.mesh.lengths[i];
            return (
                       -1 * F_i ** 2
                   ) / (
                       2 * this.E * this.mesh.lengths[i]
                   );
        });
    }
    
    private computeTotalVolume(): void {
        const A = this.mesh.normThickness;
        this.totalVolume = A.reduce(
            (acc, val, i) => acc + val * this.mesh.lengths[i],
            0
        );
    }
    
    public getResults(): TrussFeaResults {
        if (!this.computed) {
            throw new Error("FEA not computed");
        }
        
        const maxStress = roundTo(Math.max(...this.stresses), 2);
        const minStress = roundTo(Math.min(...this.stresses), 2);
        
        return {
            maxStress,
            minStress,
            volume: roundTo(this.totalVolume, 2),
            strainEnergy: roundTo(this.strainEnergy, 2),
        };
    }
}

export default TrussFea;
