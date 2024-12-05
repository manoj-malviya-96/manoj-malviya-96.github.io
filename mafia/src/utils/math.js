export class FibonacciGenerator {
    constructor() {
        this.fib1 = 1;
        this.fib2 = 1;
    }

    next() {
        const next = this.fib1 + this.fib2;
        this.fib1 = this.fib2;
        this.fib2 = next;
        return next;
    }

    reset() {
        this.fib1 = 1;
        this.fib2 = 1;
    }
}


export function computeRMS(dataArray) {
    const sum = dataArray.reduce((acc, value) => acc + (value * value), 0);
    return Math.sqrt(sum / dataArray.length);
}

export function computeVariance(array) {
    const mean = array.reduce((acc, val) => acc + val, 0) / array.length;
    return array.reduce((acc, val) => acc + (val - mean) ** 2, 0) / array.length;
}

export function computeEnergyRatio(array, threshold) {
    const below = array.filter(val => val < threshold).reduce((acc, val) => acc + val ** 2, 0);
    const total = array.reduce((acc, val) => acc + val ** 2, 0);

    return below / total; // Ratio of below-threshold energy
}


export function computeGradient(array) {
    return array.map((val, idx, arr) => {
        if (idx === 0 || idx === arr.length - 1) return 0;
        return arr[idx + 1] - arr[idx - 1];
    });
}

export const sumRange = (range) =>
    range.reduce((acc, val) => acc + val, 0);

export const meanRange = (range) =>
    sumRange(range) / range.length;