import React, {useState, useEffect} from "react";

import dataJSON from "./data/github_user_report.json";
import {createDropdownItem, rangesTo} from "../common/types";
import AtomDropdown from "../atoms/atom-dropdown";
import Plotter from "../atoms/plotter";
import {getScaleColor} from "../common/color";
import {calDaysInMonth, toTxtMonth} from "../common/date";

const GithubProfile = () => {
    const [data, setData] = useState({});
    const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
    const [totalCommits, setTotalCommits] = useState(0);
    const [longestStreak, setLongestStreak] = useState(0);

    useEffect(() => {
        const processedData = processData(dataJSON);
        setData(processedData);
        if (processedData[currentYear]) {
            updateStats(processedData[currentYear]);
        }
    }, [currentYear]);

    const processData = (rawData) => {
        const formattedData = {};
        rawData.repositories.forEach((repo) => {
            repo.daily_log.forEach(({ date, commits }) => {
                const year = new Date(date).getFullYear();
                if (!formattedData[year]) formattedData[year] = {};
                if (!formattedData[year][date]) formattedData[year][date] = 0; // Initialize to 0
                formattedData[year][date] += commits; // Sum commits across repositories
            });
        });
        return formattedData;
    };


    const updateStats = (yearData) => {
        const dates = Object.keys(yearData);
        setTotalCommits(dates.reduce((sum, date) => sum + yearData[date], 0));
        let longest = 0,
            current = 0;
        dates
            .sort((a, b) => new Date(a) - new Date(b))
            .forEach((date, i, arr) => {
                if (i > 0 && new Date(date) - new Date(arr[i - 1]) === 86400000) {
                    current++;
                } else {
                    longest = Math.max(longest, current);
                    current = 1;
                }
            });
        setLongestStreak(Math.max(longest, current));
    };

    const gridX = 24;
    const gridY = 16;

    const yearlyHeatmapData = (year) => {
        const grid = Array.from({ length: gridY }, () => Array(gridX).fill(null));
        const daysInMonth = calDaysInMonth(year);

        if (!data[year]) return grid; // Return empty grid if no data for the year
        const yearlyData = data[year];

        let currentCol = 0; // Tracks the column for each month

        daysInMonth.forEach((days, monthIndex) => {
            const firstHalf = Array(gridY).fill(null);
            const secondHalf = Array(gridY).fill(null);

            for (let day = 1; day <= days; day++) {
                const dateKey = `${year}-${String(monthIndex + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
                const commits = yearlyData[dateKey] ?? 0; // Default to 0 if data is missing

                if (day <= gridY) {
                    firstHalf[day - 1] = commits; // Fill the first half of the month
                } else {
                    secondHalf[day - 17] = commits; // Fill the second half of the month
                }
            }

            // Assign data to the grid columns for the current month
            for (let row = 0; row < gridY; row++) {
                grid[row][currentCol] = firstHalf[row]; // First half in the first column
                grid[row][currentCol + 1] = secondHalf[row]; // Second half in the second column
            }

            currentCol += 2; // Move to the next month's columns
        });

        return grid;
    };

    const generateCustomDates = (year) => {
        const daysInMonth = calDaysInMonth(year);
        const grid = Array.from({ length: gridY }, () => Array(gridX).fill(null));

        let currentCol = 0; // Tracks the column for each month
        let monthIndex = 0;
        let dayCounter = 1;

        for (let x = 0; x < gridX; x += 2) {
            const firstHalf = Array(gridY).fill(null);
            const secondHalf = Array(gridY).fill(null);

            for (let day = 1; day <= daysInMonth[monthIndex]; day++) {
                const dateKey = `${toTxtMonth(monthIndex + 1).padStart(2, "0")} ${String(day).padStart(2, "0")}`;

                if (day <= 16) {
                    firstHalf[day - 1] = dateKey; // Fill first half with valid dates
                } else {
                    secondHalf[day - 17] = dateKey; // Fill second half with valid dates
                }
            }

            // Assign valid dates or nulls to grid
            for (let row = 0; row < gridY; row++) {
                grid[row][currentCol] = firstHalf[row];
                grid[row][currentCol + 1] = secondHalf[row];
            }

            monthIndex += 1; // Move to the next month
            if (monthIndex >= 12) break; // Stop if no more months

            dayCounter = 1; // Reset day counter for the next month
            currentCol += 2; // Move to the next pair of columns
        }

        return grid;
    };

    const renderPlot = (year) => {
        const dataToPlot = yearlyHeatmapData(year);
        const dataTrace = {
            z: dataToPlot,
            colorscale: getScaleColor("rgb(30,251,28)", "rgba(99,99,99,0.21)", 16, "log"),
            type: "heatmap",
            xgap: 7,
            ygap: 7,
            zmin: 1,
            zmax: Math.max(...dataToPlot.flat()),
            showscale: false,
            hovertemplate: "%{z} commits on %{customdata}<extra></extra>",
            x: Array.from({length: gridX}, (_, num) => num),
            y: Array.from({length: gridY}, (_, num) => num),
            customdata: null,
        };
        dataTrace.customdata = generateCustomDates(year);

        return (
            <Plotter
                dataTrace={[dataTrace]}
            />
        );
    };

    const years = Object.keys(data).sort((a, b) => b - a);
    const dropdownOptions = rangesTo(years, (year) => createDropdownItem({label: year, value: year, icon: "fa fa-calendar"}));

    return (
        <div className="p-1 w-full sm:max-w-screen-sm md:max-w-screen
                        rounded-lg border-2 border-neutral border-opacity-25">
            <div className="flex space-x-4 mb-4 justify-center">
                <div className="stats shadow">
                    <div className="stat">
                        <div className="stat-title">Total Commits</div>
                        <div className="stat-value">{totalCommits}</div>
                    </div>
                    <div className="stat">
                        <div className="stat-title">Longest Streak</div>
                        <div className="stat-value">{longestStreak}</div>
                    </div>
                </div>
                {dropdownOptions.length > 0 && (<Dropdown
                    options={dropdownOptions}
                    className="m-auto"
                    initialIndex={0}
                    onClick={(option) => setCurrentYear(option.value)}
                />)}
            </div>
            <div>{data[currentYear] && renderPlot(currentYear)}</div>
        </div>
    );
};

export default GithubProfile;
