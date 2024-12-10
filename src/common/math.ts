export function computeRMS(dataArray: Array<number>) {
    const sum = dataArray.reduce((acc, value) => acc + (
        value * value
    ), 0);
    return Math.sqrt(sum / dataArray.length);
}

export function computeVariance(array: Array<number>) {
    const mean = array.reduce((acc, val) => acc + val, 0) / array.length;
    return array.reduce((acc, val) => acc + (
        val - mean
    ) ** 2, 0) / array.length;
}

export function computeEnergyRatio(array: Array<number>, threshold: number) {
    const below = array.filter(val => val < threshold).reduce((acc, val) => acc + val ** 2, 0);
    const total = array.reduce((acc, val) => acc + val ** 2, 0);
    
    return below / total; // Ratio of below-threshold energy
}

export function computeGradient(array: Array<number>) {
    return array.map((val, idx, arr) => {
        if (idx === 0 || idx === arr.length - 1) {
            return 0;
        }
        return arr[idx + 1] - arr[idx - 1];
    });
}

export const sumRange = (range: Array<number>) =>
    range.reduce((acc, val) => acc + val, 0);

export const meanRange = (range: Array<number>) =>
    sumRange(range) / range.length;