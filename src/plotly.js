const regFontSize = Number(getStyleValue("--regular-text-size"));
const subtitleFontSize = Number(getStyleValue("--subtitle-text-size"));

/* ------------ Plotly Utilities ------------ */
function createLayout(
  width,
  height,
  title,
  xTitle,
  yTitle,
  showTickLabels = true,
) {
  const margin = showTickLabels ? 100 : 0;
  const textColor = getStyleValue("--color-text");
  const backgroundColor = `rgba(0, 0, 0, 0)`;

  return {
    title: {
      text: title,
      font: {
        size: title !== "" ? getSizeFromStyle("--title-text-size") : 0,
        color: textColor,
      },
    },
    xaxis: {
      title: {
        text: xTitle,
        font: {
          size: regFontSize,
          color: textColor,
        },
      },
      tickfont: {
        size: subtitleFontSize,
        color: textColor,
      },
      showgrid: false,
      zeroline: false,
      showline: false,
      showticklabels: showTickLabels,
      scaleratio: 1, // Keeps the ratio 1:1
    },
    yaxis: {
      title: {
        text: yTitle,
        font: {
          size: regFontSize, // Set Y-axis title font size
          color: textColor,
        },
      },
      tickfont: {
        size: subtitleFontSize,
        color: textColor,
      },
      showgrid: false,
      zeroline: false,
      showline: false,
      showticklabels: showTickLabels,
      scaleanchor: "x", // Locks the Y axis to the X axis
      scaleratio: 1, // Keeps the ratio 1:1
    },
    showlegend: false, // Hide the legend
    padding: 0,
    margin: { t: margin, l: margin, r: margin, b: margin },
    autosize: true,
    width: width,
    height: height,
    paper_bgcolor: backgroundColor,
    plot_bgcolor: backgroundColor,
    hovermode: "closest",
  };
}

function getColorBar(text) {
  const textColor = getStyleValue("--color-text");
  return {
    title: {
      text: text,
      font: {
        size: regFontSize,
        color: textColor,
      },
    },
    ticks: "outside",
    tickfont: {
      size: subtitleFontSize,
      color: textColor,
    },
    thickness: 10,
  };
}

function getHackyHeightMultiplier(xLength, yLength) {
  let result = yLength / xLength;
  if (result < 1.0 && result > 0.3) {
    result = Math.min(1.0, result + 0.2); // Accounting for other elements
  }
  return result;
}

function createHeatmap(
  containerId,
  x,
  y,
  z,
  max_width = 600,
  title = "",
  xTitle = "",
  yTitle = "",
  minimalisticView = false,
) {
  const data = {
    z: z,
    x: x,
    y: y,
    type: "heatmap",
    xgap: 1,
    ygap: 1,
    colorscale: getPrimaryColorScale(5),
    colorbar: getColorBar("Probability"),
  };

  const width = max_width;
  const height = Math.ceil(
    width * getHackyHeightMultiplier(x.length, y.length),
  ); // Maintain aspect ratio

  createHeatmapFromTrace(
    containerId,
    data,
    width,
    height,
    title,
    xTitle,
    yTitle,
    minimalisticView,
  );
}

function createHeatmapFromTrace(
  containerId,
  data,
  width,
  height,
  title = "",
  xTitle = "",
  yTitle = "",
  minimalisticView = false,
) {
  if (!data.type || data.type !== "heatmap") {
    console.error("Invalid trace data for heatmap");
  }
  const showTickLabels = !minimalisticView;
  Plotly.newPlot(
    containerId,
    [data],
    createLayout(width, height, title, xTitle, yTitle, showTickLabels),
  );
}

class PlotHandler {
  constructor() {
    this.plotFunctions = [];
    initThemeChangeHandler(() => this.drawPlots());
  }

  updatePlotFunctions(plotFunctions = []) {
    if (plotFunctions.length === 0) {
      console.error("No plot functions provided to updatePlotFunctions");
      return;
    }
    this.plotFunctions = plotFunctions;
  }

  drawPlots() {
    if (this.plotFunctions && this.plotFunctions.length === 0) {
      console.error("No plot functions to draw");
      return;
    }
    this.plotFunctions.forEach((plotFunction) => plotFunction());
  }
}

function updatePlotHandler(callbacks = []) {
  if (callbacks.length === 0) {
    console.error("No callbacks provided to updatePlotHandler");
    return;
  }

  if (!window.plotHandler) {
    window.plotHandler = new PlotHandler();
  }

  window.plotHandler.updatePlotFunctions(callbacks);
  window.plotHandler.drawPlots();
}
