/* ------------ Color Utilities ------------ */

export function adjustColor(color, opacity = 1, brightness = [1, 1, 1]) {
    // Extract RGB values from the input color string (assumes 'rgb(r, g, b)' format)
    let [r, g, b] = color.match(/\d+/g).map(Number);

    // Adjust brightness by multiplying each RGB component
    r = Math.min(255, r * brightness[0]);
    g = Math.min(255, g * brightness[1]);
    b = Math.min(255, b * brightness[2]);

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

export function getScaleColor(brandColor, lastColor, numStops, mapperType = "linear") {
    let result = [[0, lastColor]];
    for (let i = 1; i <= numStops; i += 1) {
        let intensity;
        if (mapperType === "linear") {
            intensity = i / numStops; // Linear scaling
        } else if (mapperType === "exp") {
            intensity = Math.pow(i / numStops, 2); // Exponential scaling
        } else if (mapperType === "log") {
            intensity = Math.log1p(i) / Math.log1p(numStops); // Logarithmic scaling
        } else {
            throw new Error(`Unsupported mapperType: ${mapperType}`);
        }
        result.push([intensity, adjustColor(brandColor, 1, [intensity, intensity, intensity])]);
    }
    return result;
}