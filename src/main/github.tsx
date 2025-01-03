import React, {useState, useEffect} from "react";
import dataJSON from "../data/github_user_report.json";
import {rangesTo} from "../common/math";
import AtomDropdown, {
    AtomDropdownItemProps
} from "../atoms/atom-dropdown";
import AtomStats from "../atoms/atom-stats";
import {CalendarChart} from "../atoms/atom-echart";

interface DailyLog {
    date: ISODateStr; // ISO date string
    commits: number;
}

interface Languages {
    [language: string]: number | undefined;
}


interface Repository {
    repo: string; // Repository name
    daily_log: DailyLog[]; // Array of daily logs
    languages: Languages; // Map of languages with line counts
}

type RawData = Repository[];

interface ProcessedData {
    [year: Year]: {
        [date: ISODateStr]: number;
    };
}

const GithubProfile: React.FC = () => {
    const [data, setData] = useState<ProcessedData>({});
    const [currentYear, setCurrentYear] = useState<Year>(new Date().getFullYear());
    const [totalCommits, setTotalCommits] = useState<number>(0);
    const [longestStreak, setLongestStreak] = useState<number>(0);
    
    useEffect(() => {
        const rawData: RawData = dataJSON["repositories"];
        const processedData = processData(rawData);
        setData(processedData);
        if (processedData[currentYear]) {
            updateStats(processedData[currentYear]);
        }
    }, [currentYear]);
    
    const processData = (rawData: RawData): ProcessedData => {
        const formattedData: ProcessedData = {};
        
        rawData.forEach((repo) => {
            repo.daily_log.forEach(({date, commits}) => {
                const year = new Date(date).getFullYear();
                if (!formattedData[year]) {
                    formattedData[year] = {};
                }
                const dailyData = formattedData[year];
                if (!dailyData[date]) {
                    formattedData[year][date] = 0;
                } // Initialize to 0
                formattedData[year][date] += commits;
            });
        });
        return formattedData;
    };
    
    const updateStats = (yearData: Record<string, number>): void => {
        const dates = Object.keys(yearData);
        setTotalCommits(dates.reduce((sum, date) => sum + yearData[date], 0));
        let longest = 0,
            current = 0;
        dates
            .sort((a, b) => new Date(a).getTime() - new Date(b).getTime())
            .forEach((date, i, arr) => {
                if (i > 0 && new Date(date).getTime() - new Date(arr[i - 1]).getTime() === 86400000) {
                    current++;
                } else {
                    longest = Math.max(longest, current);
                    current = 1;
                }
            });
        setLongestStreak(Math.max(longest, current));
    };
    
    const years = Object.keys(data).map(Number).sort((a, b) => b - a);
    const dropdownOptions = rangesTo(
        years,
        (year): AtomDropdownItemProps => (
            {
                label: year.toString(),
                value: year,
            }
        )
    );
    
    return (
        <div
            className="p-2 w-full h-full justify-center items-center"
        >
            <div
                className="w-fit flex flex-col md:flex-row m-auto justify-between
                            item-center gap-4">
                <AtomStats text={'Total Commits'} value={totalCommits}/>
                <AtomStats text={'Longest Streak'} value={longestStreak}/>
                {dropdownOptions.length > 0 && (
                    <AtomDropdown
                        options={dropdownOptions}
                        className="w-28 m-auto"
                        initialIndex={0}
                        dropdownIcon='fas fa-calendar'
                        onClick={(option) => setCurrentYear(Number(option))}
                    />
                )}
            </div>
            <div className='w-full h-full'>
                {data[currentYear] && <CalendarChart data={data[currentYear]} unit={'Commits'}
                                                     year={currentYear} height={210}/>}
                {!data[currentYear] && <div>No data for this year</div>}
            </div>
        </div>
    );
};


export default GithubProfile;
