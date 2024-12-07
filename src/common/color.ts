/* ------------ Color Utilities ------------ */

export function adjustColor(
    color: string,
    opacity: number = 1,
    brightness: number[] = [1, 1, 1]
): string {
    if (!color) {
        throw new Error("Color is undefined");
    }

    // Match RGB values in the input string (assumes 'rgb(r, g, b)' format)
    const match = color.match(/\d+/g);

    if (!match || match.length < 3) {
        throw new Error("Invalid color format. Expected 'rgb(r, g, b)'.");
    }

    // Extract and parse RGB values
    let [r, g, b] = match.map(Number);

    // Adjust brightness and ensure values are clamped between 0 and 255
    r = Math.min(255, Math.max(0, r * brightness[0]));
    g = Math.min(255, Math.max(0, g * brightness[1]));
    b = Math.min(255, Math.max(0, b * brightness[2]));

    // Validate opacity is between 0 and 1
    if (opacity < 0 || opacity > 1) {
        throw new Error("Opacity must be between 0 and 1.");
    }

    // Return the modified color in 'rgba(r, g, b, opacity)' format
    return `rgba(${r}, ${g}, ${b}, ${opacity})`;
}


type HexColor = `#${string}`;

export function hexToRgb(hex: HexColor) {
    if (!hex) {
        return "0,0,0"; // Fallback to black if color is undefined
    }
    const bigint = parseInt(hex.slice(1), 16);
    const r = (bigint >> 16) & 255;
    const g = (bigint >> 8) & 255;
    const b = bigint & 255;
    return `${r},${g},${b}`;
}

type CSSProperty = `--${string}`;

export function getStyleValue(property: CSSProperty) {
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

export function getSizeFromStyle(property: CSSProperty) {
    return Number(getStyleValue(property).replace("px", ""));
}


type ColorMapperType = "linear" | "exp" | "log";
export function getScaleColor(
    brandColor: string | HexColor,
    lastColor: string | HexColor,
    numStops: number,
    mapperType: ColorMapperType = "linear"
): Array<[number, string]> {
    const result: Array<[number, string]> = [[0, lastColor]];

    for (let i = 1; i <= numStops; i++) {
        let intensity: number;

        // Determine the scaling intensity
        switch (mapperType) {
            case "linear":
                intensity = i / numStops;
                break;
            case "exp":
                intensity = Math.pow(i / numStops, 2);
                break;
            case "log":
                intensity = Math.log1p(i) / Math.log1p(numStops);
                break;
            default:
                throw new Error(`Unsupported mapperType: ${mapperType}`);
        }

        // Add the scaled color to the result
        result.push([
            intensity,
            adjustColor(brandColor, 1, [intensity, intensity, intensity]),
        ]);
    }

    return result;
}