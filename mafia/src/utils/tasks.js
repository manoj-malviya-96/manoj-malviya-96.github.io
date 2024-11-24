export function runWithDelay(callback, delay_ms = 300, single_arg = null) {
    if (!callback) {
        console.error("Callback function not provided");
        return;
    }
    if (single_arg === null) {
        setTimeout(callback, delay_ms);
        return;
    }
    const run = () => callback(single_arg);
    setTimeout(run, delay_ms);
}

export async function runAsync(task) {
    if (!task) {
        return;
    }
    try {
        await task(); // Waits for the callback promise to resolve
    } catch (error) {
        console.error("Error in callback:", error);
        // Handle error if needed
    }
}