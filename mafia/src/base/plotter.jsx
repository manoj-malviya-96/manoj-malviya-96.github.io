import Plot from "react-plotly.js";

function createLayout(
    width,
    height,
    title,
    xTitle,
    yTitle,
    minimalView = true,
    textColor = "#ffffff"
) {
    const margin = !minimalView ? 100 : 0;
    const backgroundColor = `rgba(0, 0, 0, 0)`;

    return {
        title: {
            text: title,
            font: {
                size: title !== "" ? 20 : 0,
                color: textColor,
            },
        },
        xaxis: {
            title: {
                text: xTitle,
                font: {
                    size: 20,
                    color: textColor,
                },
            },
            tickfont: {
                size: 10,
                color: textColor,
            },
            showgrid: false,
            zeroline: false,
            showline: false,
            showticklabels: !minimalView,
            scaleratio: 1,
        },
        yaxis: {
            title: {
                text: yTitle,
                font: {
                    size: 20,
                    color: textColor,
                },
            },
            tickfont: {
                size: 10,
                color: textColor,
            },
            showgrid: false,
            zeroline: false,
            showline: false,
            showticklabels: !minimalView,
            scaleanchor: "x",
            scaleratio: 1,
        },
        showlegend: false,
        padding: 0,
        margin: {t: margin, l: margin, r: margin, b: margin},
        autosize: true,
        width: width,
        height: height,
        paper_bgcolor: backgroundColor,
        plot_bgcolor: backgroundColor,
        hovermode: "closest",
    };
}

const Plotter = ({
                     dataTrace,
                     title = "",
                     xTitle = "",
                     yTitle = "",
                     height = 400,
                     width = 600,
                     textColor = "#ffffff",
                     minimalView = true
                 }) => {
    return (
        <div
            className="relative w-full h-full max-h-screen max-w-full
            overflow-scroll scrollbar-thin scrollbar-thumb-gray-500 scrollbar-track-gray-100
            rounded-md p-2 shadow-lg border-2 border-neutral border-opacity-25"
        >
            <Plot
                data={dataTrace}
                layout={createLayout(width, height, title, xTitle, yTitle, minimalView, textColor)}
                config={{
                    displaylogo: false, // Removes the Plotly logo
                    responsive: true, // Ensures responsiveness
                }}
            />
        </div>
    );
}
export default Plotter;
