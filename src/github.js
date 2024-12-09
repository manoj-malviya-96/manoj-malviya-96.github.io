class GithubProfile {
  constructor(dataUrl) {
    this.dataUrl = dataUrl;
    this.newData = {}; // To store the daily commit counts by year
    this.currentYear = 0;
    this.init();
  }

  // Fetch the data and initialize the heatmap
  init() {
    fetch(this.dataUrl)
      .then((response) => response.json())
      .then((data) => {
        this.processData(data);
        this.generateYearButtons(); // Generate buttons after data is loaded
        initThemeChangeHandler(() => this.renderHeatmap(this.currentYear));
        setTimeout(() => this.changeYear(this.currentYear), timeOut_ms);
        // Delay to ensure the buttons are rendered first
      })
      .catch((error) =>
        console.error("Error fetching JSON:", error, this.dataUrl),
      );
  }

  // Process the JSON data and populate newData
  processData(data) {
    data.repositories.forEach((repo) => {
      repo.daily_log.forEach((log) => {
        const date = log.date;
        const year = new Date(date).getFullYear();
        this.currentYear = Math.max(year, this.currentYear);

        if (!this.newData[year]) this.newData[year] = {};
        if (!this.newData[year][date]) this.newData[year][date] = 0;

        this.newData[year][date] += log.commits;
      });
    });
  }

  // Generate year buttons dynamically
  generateYearButtons() {
    const yearButtonsContainer = document.getElementById("yearButtons");
    const years = Object.keys(this.newData).sort((a, b) => b - a); // Sort years descending

    years.forEach((year) => {
      const button = document.createElement("button");
      button.className = "primary-button text-only";

      // Set a unique id for each button
      button.id = `buttonFor${year}`;
      button.textContent = year;

      // Add event listener for year change
      button.addEventListener("click", () => this.changeYear(year));
      yearButtonsContainer.appendChild(button);
    });
  }

  // Function to change the year and update the heatmap
  changeYear(year) {
    // Add 'selected' class to the newly selected button using its id
    const newSelectedButton = document.getElementById(`buttonFor${year}`);
    togglePrimaryButton(newSelectedButton, true);

    // Render the heatmap
    this.renderHeatmap(year);
    this.currentYear = year;
  }

  // Render the heatmap
  renderHeatmap(year) {
    const z = this.getHeatmapData(year);
    // January 1st of the given year
    const startDate = new Date(year, 0, 1);

    // Function to estimate the exact date based on the week and day within that week
    const estimateExactDate = (week, day) => {
      // Start from January 1 of the given year
      const exactDate = new Date(startDate);

      // Calculate the exact day by adding days for both week and day within that week
      exactDate.setDate(startDate.getDate() + week * 7 + day); // Adjust for week and day
      const month = monthNames[exactDate.getMonth()];
      const date = exactDate.getDate();

      return `${month} ${date}`;
    };

    // Generate the exact dates for each cell based on week and day
    const customDates = [];
    for (let day = 0; day < z.length; day++) {
      const temp = [];
      for (let week = 0; week < z[0].length; week++) {
        temp.push(estimateExactDate(week, day));
      }
      customDates.push(temp);
    }

    const heatmapTrace = {
      z: z,
      type: "heatmap",
      xgap: 5,
      ygap: 5,
      colorscale: getPrimaryColorScale(7),
      zmin: 1, // Avoid 0 on the log scale
      zmax: Math.max(...z.flat()), // Set zmax based on the highest commit count
      showscale: false,
      hovertemplate: "%{z} commits on %{customdata}<extra></extra>",
      x: Array.from({ length: z[0].length }, (_, week) => week), // x represents the week number
      y: Array.from({ length: 7 }, (_, day) => day), // y represents the day within the week
      customdata: customDates, // Assign customDates to customdata for each cell
    };

    // Assign customDates to each cell in customdata so it can be used in the hovertemplate
    heatmapTrace.customdata = customDates;

    const width = getSizeFromStyle("--max-body-width");
    const height = Math.ceil(
      width * getHackyHeightMultiplier(z[0].length, z.length),
    );
    createHeatmapFromTrace(
      "githubHeatMap",
      heatmapTrace,
      width,
      height,
      "",
      "",
      "",
      true,
    );

    // Update the header bar with total commits and longest streak
    this.updateStats(year);
  }

  // Get the heatmap data for a specific year
  getHeatmapData(year) {
    const commitData = this.newData[year] || {};
    const dates = Object.keys(commitData);

    // Prepare empty array for 7 days (week rows) and 52 weeks (cols)
    const z = Array(7)
      .fill()
      .map(() => Array(52).fill(0));

    dates.forEach((date) => {
      const currentDate = new Date(date);
      const dayOfWeek = currentDate.getDay(); // Sunday = 0, Monday = 1, ..., Saturday = 6
      const weekOfYear = Math.floor(
        (currentDate - new Date(currentDate.getFullYear(), 0, 1)) /
          (7 * 24 * 60 * 60 * 1000),
      ); // Calculate week number

      // Fill the matrix with commit data
      if (weekOfYear < 52) {
        // Ensure we stay within 52 weeks
        z[dayOfWeek][weekOfYear] = commitData[date] || 0;
      }
    });

    return z;
  }

  // Update the stats (Total Commits, Longest Streak)
  updateStats(year) {
    const commitData = this.newData[year] || {};
    const dates = Object.keys(commitData);

    // Calculate total commits
    document.getElementById("totalCommits").innerText = dates.reduce(
      (sum, date) => sum + commitData[date],
      0,
    );

    // Calculate the longest streak (consecutive days with commits)
    let longestStreak = 0,
      currentStreak = 0;
    dates
      .sort((a, b) => new Date(a) - new Date(b))
      .forEach((date, index, array) => {
        if (
          index > 0 &&
          (new Date(date) - new Date(array[index - 1])) /
            (1000 * 60 * 60 * 24) ===
            1
        ) {
          currentStreak++;
        } else {
          longestStreak = Math.max(longestStreak, currentStreak);
          currentStreak = 1;
        }
      });
    longestStreak = Math.max(longestStreak, currentStreak);
    document.getElementById("longestStreak").innerText = longestStreak;
  }
}
