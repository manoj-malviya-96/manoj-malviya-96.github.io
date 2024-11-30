import React, { useState, useEffect } from "react";

import dataJSON from "../data/github_user_report.json";
import {toTxtMonth} from "../../utils/date";
import {createDropdownItem, rangesTo} from "../../utils/types";
import Dropdown from "../../base/dropdown";
import HeatmapPlot from "../../base/heatmap-plot";

const GithubHeatmap = () => {
    const [data, setData] = useState({});
    const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
    const [totalCommits, setTotalCommits] = useState(0);
    const [longestStreak, setLongestStreak] = useState(0);

    useEffect(() => {
        const processedData = processData(dataJSON);
        console.log(processedData);
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
                formattedData[year][date] = (formattedData[year][date] || 0) + commits;
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
    const renderPlot = (year) => {
        const yearData = data[year] || {};
        const dailyData = Array(365).fill(0);

        // Map commits to each day of the year
        Object.keys(yearData).forEach((date) => {
            const dayOfYear = Math.floor(
                (new Date(date) - new Date(new Date(date).getFullYear(), 0, 0)) / (24 * 60 * 60 * 1000)
            );
            dailyData[dayOfYear] += yearData[date];
        });

        return (
            <HeatmapPlot
                data={dailyData} // Actual daily commit data for the year
                xLabels={Array.from({ length: 12 }, (_, i) => toTxtMonth(i + 1))} // Month labels
                yLabels={Array.from({ length: 31 }, (_, i) => i + 1)} // Day labels
                height={600}
                width={600}
                colorscale={["#d6e685", "#8cc665", "#44a340", "#1e6823"]} // Discrete colors
                textColor={"#ffffff"}
            />
        );
    };

    const years = Object.keys(data).sort((a, b) => b - a);
    const dropdownOptions = rangesTo(years, (year) => createDropdownItem({label: year, value: year}));

    return (
        <div className="p-1 w-full sm:max-w-screen-sm md:max-w-screen">
            <div className="flex space-x-4 mb-4">
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
                    onClick={(option) => setCurrentYear(option.value)}
                />)}
            </div>
            <div>{data[currentYear] && renderPlot(currentYear)}</div>
        </div>
    );
};

export default GithubHeatmap;
