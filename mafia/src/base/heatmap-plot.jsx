import React from "react";
import Plot from "react-plotly.js";

const getDaisyUIColor = (variable) => {
    return getComputedStyle(document.documentElement).getPropertyValue(variable).trim();
};

const CirclePlot = ({
                        dailyData,
                        year,
                        title = "",
                        radialTitle = "",
                        angularTitle = "",
                        markerSize = 10,
                    }) => {
    // Map days to angles (0° to 360°)
    const angles = dailyData.map((_, i) => (i / dailyData.length) * 360);
    const radii = dailyData;

    // Dynamic color variables
    const primaryColor = getDaisyUIColor("--tw-prose-headings") || "#f63b4b"; // Fallback to blue
    const textColor = getDaisyUIColor("--tw-prose-body") || "#374151"; // Fallback to gray

    return (
        <Plot
            data={[
                {
                    type: "scatterpolar",
                    r: radii,
                    theta: angles,
                    mode: "markers",
                    marker: {
                        size: markerSize,
                        color: radii,
                        colorscale: [
                            [0, primaryColor],
                            [1, primaryColor],
                        ], // Use DaisyUI's primary theme for colors
                        showscale: false,
                    },
                    hoverinfo: "r+theta", // Show radius (values) and angle (days)
                },
            ]}
            layout={{
                title: {
                    text: title,
                    font: { size: 28, color: textColor }, // Larger title font
                },
                polar: {
                    bgcolor: "rgba(0,0,0,0)", // Transparent inside the circle
                    radialaxis: {
                        title: { text: radialTitle, font: { size: 16, color: textColor } },
                        tickfont: { size: 14, color: textColor }, // Bigger tick font
                        showgrid: true,
                        gridcolor: primaryColor,
                        gridwidth: 1,
                    },
                    angularaxis: {
                        title: { text: angularTitle, font: { size: 16, color: textColor } },
                        tickfont: { size: 14, color: textColor }, // Bigger tick font
                        tickmode: "array",
                        tickvals: [0, 90, 180, 270], // Quadrants
                        ticktext: ["Jan", "Apr", "Jul", "Oct"],
                    },
                },
                hovermode: "closest",
                paper_bgcolor: "rgba(0,0,0,0)", // Transparent background
                plot_bgcolor: "rgba(0,0,0,0)", // Transparent background
                autosize: true,
            }}
            style={{ width: "100%", height: "100%" }}
        />
    );
};

export default CirclePlot;
