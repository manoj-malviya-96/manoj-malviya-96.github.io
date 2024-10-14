class FibonacciGenerator {
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
