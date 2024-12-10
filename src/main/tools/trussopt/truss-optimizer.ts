import TrussMesh from "./truss-mesh";
import TrussFea from "./truss-fea";
import {epsilon} from "numeric";

class TrussOptimizer {
    readonly currentMesh: TrussMesh;
    private readonly numIterations: number;
    private readonly targetFraction: number;
    private startObj: number = 0;
    private startVolume: number = 0;
    message: string = "";
    success: boolean = false;
    
    constructor(initialMesh: TrussMesh, numIterations: number = 200, targetFraction: number = 0.4) {
        this.currentMesh = initialMesh;
        this.numIterations = numIterations;
        this.targetFraction = targetFraction;
        this.computeInitValues(initialMesh);
    }
    
    computeInitValues(initialMesh: TrussMesh): void {
        const feaEngine = new TrussFea(initialMesh);
        feaEngine.compute();
        this.startObj = feaEngine.strainEnergy;
        this.startVolume = feaEngine.totalVolume;
    }
    
    computeLambda(X: number[], dc: number[], lengths: number[]) {
        // Bisection parameters
        let l1 = 1e-24;
        let l2 = 1e24;
        const tolerance = 1e-4;
        let X_temp = X;
        const targetVolume = this.startVolume * this.targetFraction;
        
        let lmid = (
                       l1 + l2
                   ) / 2;
        
        while (l2 - l1 > tolerance) {
            lmid = 0.5 * (
                l2 + l1
            );
            
            // Calculate potential `X_new` based on current `lmid`
            X_temp = X.map((x, index) => {
                const d = Math.sqrt((
                                        -1 * dc[index]
                                    ) / lmid);
                const xn = x * d;
                return Math.max(Math.min(1, xn), epsilon);
            });
            
            // Calculate volume of `X_temp`
            const currentVolume = X_temp.reduce(
                (sum, xi, i) => sum + xi * lengths[i],
                0,
            );
            
            // Adjust `l1` and `l2` based on volume constraint
            if (currentVolume >= targetVolume) {
                l1 = lmid; // Increase `lmid` to reduce volume
            } else {
                l2 = lmid; // Decrease `lmid` to increase volume
            }
        }
        return X_temp; // Return the lambda that satisfies the
                       // volume constraint
    }
    
    iterate() {
        const mesh = this.currentMesh;
        const X = mesh.normThickness;
        
        const FEA = new TrussFea(mesh);
        FEA.compute();
        
        const obj = FEA.strainEnergy / this.startObj;
        if (isNaN(obj)) {
            this.success = false;
            this.message =
                "FEA computation failed, optimization leads to NaN displacements";
            return;
        }
        
        const penn = Math.pow(obj, 2); // Penalty term
        const dObj_dX = FEA.derivative_strainEnergy.map((dc) => penn * dc);
        
        const newThickness = this.computeLambda(X, dObj_dX, mesh.lengths);
        
        // Check if all elements are at the minimum thickness
        if (newThickness.every((val) => val <= epsilon)) {
            this.success = false;
            this.message =
                "Cant optimize more, all elements are at minimum thickness";
            return;
        }
        
        this.currentMesh.normThickness = newThickness;
        this.message = `
            Volume: ${FEA.totalVolume}
            Strain-Energy: ${FEA.strainEnergy}
            `;
    }
    
    async optimize() {
        for (let i = 0; i < this.numIterations; i++) {
            this.iterate();
            if (!this.success) {
                console.error("Iteration failed");
                return;
            }
        }
        this.success = true;
    }
}

export default TrussOptimizer;