class GithubProfile {
    constructor(dataUrl) {
        this.dataUrl = dataUrl;
        this.newData = {};  // To store the daily commit counts by year
        this.currentYear = 0;
        this.init();
    }

    // Fetch the data and initialize the heatmap
    init() {
        fetch(this.dataUrl)
            .then(response => response.json())
            .then(data => {
                this.processData(data);
                this.generateYearButtons();  // Generate buttons after data is loaded
                this.renderHeatmap(this.currentYear);  // Initial render with default year
            })
            .catch(error => console.error('Error fetching JSON:', error));
    }

    // Process the JSON data and populate newData
    processData(data) {
        data.repositories.forEach(repo => {
            repo.daily_log.forEach(log => {
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
        const yearButtonsContainer = document.getElementById('yearButtons');
        const years = Object.keys(this.newData).sort((a, b) => b - a);  // Sort years descending

        years.forEach(year => {
            const button = document.createElement('button');
            button.className = 'primary-button';

            // Set a unique id for each button
            button.id = `buttonFor${year}`;
            button.textContent = year;

            // Add event listener for year change
            button.addEventListener('click', () => this.changeYear(year));
            yearButtonsContainer.appendChild(button);
        });

        console.log(yearButtonsContainer);

        // Ensure the button exists before adding the 'selected' class
        const defaultButton = document.getElementById(`buttonFor${years[0]}`);
        if (defaultButton) {
            defaultButton.classList.add('selected');  // Set the first button (latest year) as selected
        }
    }

    // Function to change the year and update the heatmap
    changeYear(year) {
        if (year === this.currentYear) return;  // Don't re-render if the year hasn't changed

        // Remove 'selected' class from the currently selected button, if any
        const selectedButton = document.querySelector('.primary-button.selected');
        if (selectedButton) {
            selectedButton.classList.remove('selected');
        }

        // Add 'selected' class to the newly selected button using its id
        const newSelectedButton = document.getElementById(`buttonFor${year}`);
        if (newSelectedButton) {
            newSelectedButton.classList.add('selected');
        }
        // Render the heatmap
        this.renderHeatmap(year);
        this.currentYear = year;
    }

    // Render the heatmap
    renderHeatmap(year) {
        const z = this.getHeatmapData(year);
        const totalCommits = z.flat().reduce((sum, val) => sum + val, 0);  // Calculate total commits for the year

        const heatmapTrace = {
            z: z,
            type: 'heatmap',
            xgap: 1,
            ygap: 1,
            colorscale: 'Reds',
            zmin: 1,  // Avoid 0 on the log scale
            zmax: Math.max(...z.flat()),  // Set zmax based on the highest commit count
            showscale: true,
            colorbar: {
                title: 'Commits',
                thickness: 10
            },
            hovertemplate: 'Week %{x}, Day %{y}: %{z} commits<extra></extra>',
        };

        const heatmapLayout = createLayout('', '', '', false);
        Plotly.newPlot('githubHeatMap', [heatmapTrace], heatmapLayout);

        // Update the header bar with total commits and longest streak
        this.updateStats(year);
    }

    // Get the heatmap data for a specific year
    getHeatmapData(year) {
        const commitData = this.newData[year] || {};
        const dates = Object.keys(commitData);

        // Prepare empty array for 7 days (week rows) and 52 weeks (cols)
        const z = Array(7).fill().map(() => Array(52).fill(0));

        dates.forEach(date => {
            const currentDate = new Date(date);
            const dayOfWeek = currentDate.getDay();  // Sunday = 0, Monday = 1, ..., Saturday = 6
            const weekOfYear = Math.floor((currentDate - new Date(currentDate.getFullYear(), 0, 1)) / (7 * 24 * 60 * 60 * 1000));  // Calculate week number

            // Fill the matrix with commit data
            if (weekOfYear < 52) {  // Ensure we stay within 52 weeks
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
        const totalCommits = dates.reduce((sum, date) => sum + commitData[date], 0);
        document.getElementById('totalCommits').innerText = totalCommits;

        // Calculate the longest streak (consecutive days with commits)
        let longestStreak = 0, currentStreak = 0;
        dates.sort((a, b) => new Date(a) - new Date(b)).forEach((date, index, array) => {
            if (index > 0 && (new Date(date) - new Date(array[index - 1])) / (1000 * 60 * 60 * 24) === 1) {
                currentStreak++;
            } else {
                longestStreak = Math.max(longestStreak, currentStreak);
                currentStreak = 1;
            }
        });
        longestStreak = Math.max(longestStreak, currentStreak);
        document.getElementById('longestStreak').innerText = longestStreak;
    }
}