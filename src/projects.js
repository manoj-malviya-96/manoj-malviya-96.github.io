const max_width = 600;

function createPlotsForDfam() {
  const heatmap1 = () => {
    createHeatmap(
      "heatmap1",
      ["Design Prompt", "Add Material", "Remove Material", "Editing"],
      ["S1", "S2", "S3", "S4"],
      [
        [0.91, 0, 0.08, 0],
        [0.88, 0, 0, 0.12],
        [0.23, 0, 0.53, 0.23],
        [0.08, 0.17, 0.67, 0.08],
      ],
      max_width,
      "Analysis of the design process in Dfam",
      "Design Step",
      "States",
    );
  };
  const heatmap2 = () => {
    createHeatmap(
      "heatmap2",
      ["S1", "S2", "S3", "S4"],
      ["S1", "S2", "S3", "S4"],
      [
        [0.05, 0.91, 0.03, 0],
        [0.75, 0.07, 0.05, 0.13],
        [0, 0.03, 0, 0.92],
        [0.01, 0.02, 0.65, 0.32],
      ],
      max_width,
      "Transition Probabilities in Dfam",
      "From State",
      "To State",
    );
  };
  updatePlotHandler([heatmap1, heatmap2]);
}

function createPlotsForDeltaDesign() {
  const heatmap1 = () => {
    createHeatmap(
      "heatmap1",
      [
        "Add UP Delta",
        "Add DOWN Delta",
        "Add Anchor",
        "Move",
        "Fine Control",
        "Flip",
        "Color",
        "Delete",
        "End Study",
      ],
      ["S1", "S2", "S3", "S4"],
      [
        [0.28, 0.27, 0.02, 0.02, 0.03, 0.04, 0.04, 0.0, 0.35], // S1
        [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0], // S2
        [0.0, 0.95, 0.0, 0.01, 0.0, 0.01, 0.79, 0.01, 0.02], // S3
        [0.65, 0.0, 0.05, 0.0, 0.01, 0.1, 0.84, 0.0, 0.89], // S4
      ],
      max_width,
      "Analysis of the design process in Delta Design",
      "Design Step",
      "States",
    );
  };
  const heatmap2 = () => {
    createHeatmap(
      "heatmap2",
      ["S1", "S2", "S3", "S4"],
      ["S1", "S2", "S3", "S4"],
      [
        [0.65, 0.0, 0.02, 0.33], // S1 -> S1, S2, S3, S4
        [0.01, 0.79, 0.0, 0.09], // S2 -> S1, S2, S3, S4
        [0.04, 0.01, 0.84, 0.02], // S3 -> S1, S2, S3, S4
        [0.01, 0.0, 0.01, 0.89], // S4 -> S1, S2, S3, S4
      ],
      max_width,
      "Transition Probabilities in Delta Design",
      "From State",
      "To State",
    );
  };
  updatePlotHandler([heatmap1, heatmap2]);
}
