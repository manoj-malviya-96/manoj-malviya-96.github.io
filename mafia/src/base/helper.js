/* ------------ Helper functions ------------ */
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

/* ------------ URL and Storage ------------ */
export function addParamsToURL(params) {
    const url = new URL(window.location);
    for (const key in params) {
        url.searchParams.set(key, params[key]);
    }
    return url;
}

export function getURLParams(key) {
    const params = new URLSearchParams(window.location.search);
    return params.get(key);
}

export function storeValueInStorage(key, value) {
    localStorage.setItem(key, value);
}

export function getValueFromStorage(key, defaultValue) {
    return localStorage.getItem(key) || defaultValue;
}

/* ------------ Date Parsing ------------ */
export const months = {
    Jan: 1,
    Feb: 2,
    Mar: 3,
    Apr: 4,
    May: 5,
    Jun: 6,
    Jul: 7,
    Aug: 8,
    Sep: 9,
    Oct: 10,
    Nov: 11,
    Dec: 12,
};

export function fromTxtMonth(month) {
    return months[month] || 0;
}

export function parseDate(dateString) {
    const [month, day, year] = dateString.split(" ");
    return (
        year * 10000 + fromTxtMonth(month) * 100 + parseInt(day.replace(",", ""))
    );
}

export function getElementAttribute(
    doc,
    selector,
    attr = "textContent",
    defaultValue = "",
) {
    const element = doc.querySelector(selector);
    return element
        ? attr === "textContent"
            ? element.textContent
            : element.getAttribute(attr)
        : defaultValue;
}

export function emitEvent(eventName, data) {
    const event = new CustomEvent(
        eventName,
        data !== null ? { detail: data } : null,
    );
    window.document.dispatchEvent(event);
}

/* ------------ Color Utilities ------------ */
export function adjustColor(color, opacity = 1, brightness = 1) {
    // Extract RGB values from the input color string (assumes 'rgb(r, g, b)' format)
    let [r, g, b] = color.match(/\d+/g).map(Number);

    // Adjust brightness by multiplying each RGB component
    r = Math.min(255, r * brightness);
    g = Math.min(255, g * brightness);
    b = Math.min(255, b * brightness);

    // Return the modified color as 'rgba(r, g, b, opacity)'
    return `rgba(${r}, ${g}, ${b}, ${opacity})`;
}

export function hexToRgb(hex) {
    if (!hex) {
        return "0,0,0"; // Fallback to black if color is undefined
    }
    const bigint = parseInt(hex.slice(1), 16);
    const r = (bigint >> 16) & 255;
    const g = (bigint >> 8) & 255;
    const b = bigint & 255;
    return `${r},${g},${b}`;
}

/* ------------ Style Utilities ------------ */
export function getStyleValue(property) {
    const propertyFromBody = getComputedStyle(
        window.document.body,
    ).getPropertyValue(property);
    if (propertyFromBody !== "") {
        return propertyFromBody;
    }
    return getComputedStyle(window.document.documentElement).getPropertyValue(
        property,
    );
}

export function getSizeFromStyle(property) {
    return Number(getStyleValue(property).replace("px", ""));
}


export function getContinuousScaleColor(value, topColor, bottomColor, midColor) {
    const posColor = parseColor(topColor); // Green for positive
    const negColor = parseColor(bottomColor); // Red for negative
    const neutralColor = parseColor(midColor); // Neutral color

    // Clamp value between 0 and 1
    const clampedValue = Math.min(Math.max(value, 0), 1);

    // Determine interpolation factor `t` based on value position
    const t =
        clampedValue < 0.5 ? clampedValue / 0.5 : (clampedValue - 0.5) / 0.5;

    // Select the appropriate colors for interpolation
    const startColor = clampedValue < 0.5 ? negColor : neutralColor;
    const endColor = clampedValue < 0.5 ? neutralColor : posColor;

    // Interpolate between startColor and endColor
    const r = startColor.r + t * (endColor.r - startColor.r);
    const g = startColor.g + t * (endColor.g - startColor.g);
    const b = startColor.b + t * (endColor.b - startColor.b);
    const a = startColor.a + t * (endColor.a - startColor.a);

    // Return interpolated color as rgba string
    return `rgba(${Math.round(r)}, ${Math.round(g)}, ${Math.round(b)}, ${a.toFixed(2)})`;
}

// Helper function to parse color string (e.g., rgba(255, 255, 255, 0.5) or hex) into {r, g, b, a}
export function parseColor(color) {
    const rgbaMatch = color.match(/rgba?\((\d+), (\d+), (\d+),?\s?(\d?.?\d+)?\)/);
    if (rgbaMatch) {
        return {
            r: parseInt(rgbaMatch[1], 10),
            g: parseInt(rgbaMatch[2], 10),
            b: parseInt(rgbaMatch[3], 10),
            a: rgbaMatch[4] ? parseFloat(rgbaMatch[4]) : 1, // Default alpha to 1 if not provided
        };
    }

    // If color is in hex, parse it to RGB (ignores alpha for simplicity)
    const hexMatch = color.match(/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i);
    if (hexMatch) {
        return {
            r: parseInt(hexMatch[1], 16),
            g: parseInt(hexMatch[2], 16),
            b: parseInt(hexMatch[3], 16),
            a: 1, // Default alpha to 1
        };
    }

    throw new Error("Invalid color format");
}

export function getScaleColor(brandColor, lastColor, numStops) {
    let result = [[0, lastColor]];
    for (let i = 1; i <= numStops; i += 1) {
        const intensity = i / numStops;
        result.push([intensity, adjustColor(brandColor, 1, intensity)]);
    }
    return result;
}