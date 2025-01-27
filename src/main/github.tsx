import React, { useEffect, useState } from "react";
import {
  AtomColumn,
  AtomRow,
  LayoutAlign,
  LayoutGap,
  LayoutSize,
} from "../atoms/atom-layout";
import AtomCalendarChart from "../atoms/charts/atom-calendar-chart";
import { CurrentYear, getCurrentDayInYear } from "../common/date";
import { AtomTitleText } from "../atoms/atom-text";
import { AtomLoader } from "../atoms/atom-loader";
import AtomStats, { Stats } from "../atoms/atom-stats";
import {
  aRange,
  longestNonZeroSubset,
  meanRangeWithNonZero,
  rangesTo,
  roundTo,
} from "../common/math";
import {
  AtomButtonBar,
  TabBarOrientation,
  TabButtonProps,
} from "../atoms/atom-bars";
import AtomDropdown from "../atoms/atom-dropdown";
import AtomRaceLineChart from "../atoms/charts/atom-race-line";

const API_URL = "https://github-contributions-api.jogruber.de/v4/";
const ChartHeight = 210;
const GithubColor = "#00dc2c";

export interface Activity {
  date: string;
  count: number;
  level: 0 | 1 | 2 | 3 | 4;
}

type Year = number | "last";

export interface GithubApiResponse {
  total: {
    [year: number]: number;
    [year: string]: number;
  };
  contributions: Array<Activity>;
}

export interface GithubApiErrorResponse {
  error: string;
}

interface FetchGithubDataOptions {
  username: string;
  year?: Year;
}

export const fetchGithubData = async ({
  username,
  year,
}: FetchGithubDataOptions) => {
  year = year || "last";
  const response = await fetch(`${API_URL}${username}?y=${year}`);
  const data = (await response.json()) as
    | GithubApiResponse
    | GithubApiErrorResponse;
  if (!response.ok) {
    throw new Error(
      `Fetching GitHub contribution data for "${username}" failed: ${
        (data as GithubApiErrorResponse).error
      }`,
    );
  }
  return data as GithubApiResponse;
};

interface GithubPlotProps {
  data: GithubApiResponse;
  year: number;
}

const GithubRaceLinePlot: React.FC<GithubPlotProps> = ({ data, year }) => {
  const maxLength =
    year !== CurrentYear ? data.contributions.length : getCurrentDayInYear();
  const allDates = aRange(0, maxLength, 1);
  const accumulatedContributions = data.contributions
    .reduce((acc, activity) => {
      acc.push((acc[acc.length - 1] || 0) + activity.count);
      return acc;
    }, [] as number[])
    .slice(0, maxLength);

  const chartData = [
    {
      label: "Contributions",
      data: accumulatedContributions,
    },
  ];
  return (
    <AtomRaceLineChart
      data={chartData}
      time={allDates}
      height={ChartHeight}
      xAxisLabel="Day of the year"
      yAxisLabel="Contributions"
      mainColor={GithubColor}
    />
  );
};

const GithubCalendarPlot: React.FC<GithubPlotProps> = ({ data, year }) => {
  const transformedData: Record<string, number> = {};
  data.contributions.forEach((activity) => {
    transformedData[activity.date] = activity.count;
  });
  return (
    <AtomCalendarChart
      data={transformedData}
      year={year}
      unit={"contributions"}
      height={ChartHeight}
      mainColor={GithubColor}
    />
  );
};

export enum GithubPlotType {
  Calendar = 0,
  Accumulated = 1,
}

export const GithubView = () => {
  // const [user, setUser] = useState<string>('manoj-malviya-96');
  const user = "manoj-malviya-96";
  const [data, setData] = useState<GithubApiResponse | null>(null);
  const [error, setError] = useState<GithubApiErrorResponse | null>(null);
  const [year, setYear] = useState<Year>(CurrentYear - 1);
  const [loading, setLoading] = useState<boolean>(false);
  const [type, setType] = useState<GithubPlotType>(GithubPlotType.Calendar);

  const [longestStreak, setLongestStreak] = useState<Stats>(undefined);
  const [total, setTotal] = useState<Stats>(undefined);
  const [dailyAverage, setDailyAverage] = useState<Stats>(undefined);

  useEffect(() => {
    setLoading(true);
    // Fetch new data
    fetchGithubData({
      username: user,
      year: year,
    })
      .then((data: GithubApiResponse) => setData(data))
      .catch((error: GithubApiErrorResponse) => setError(error));
    setLoading(false);
  }, [user, year, setData, setError]);

  useEffect(() => {
    const contributions = data?.contributions;
    const totalContribution = data?.total[year];
    if (!contributions || !totalContribution) {
      setLongestStreak(undefined);
      setTotal(undefined);
      return;
    }
    const contributionsAsList = rangesTo<Activity, number>(
      contributions,
      (item: Activity) => item.count,
    );
    setDailyAverage(roundTo(meanRangeWithNonZero(contributionsAsList), 1));
    setTotal(totalContribution);
    setLongestStreak(longestNonZeroSubset(contributionsAsList));
  }, [data, year, setLongestStreak, setTotal, setDailyAverage]);

  const buttonsProps = aRange(CurrentYear, 4, -1).map(
    (year) =>
      ({
        label: year.toString(),
        onClick: () => setYear(year),
      }) as TabButtonProps,
  );

  const _year = year === "last" ? CurrentYear - 1 : year;

  return (
    <div className={"w-full h-full inline-block"}>
      <AtomColumn size={LayoutSize.FullSize}>
        {data && !loading && (
          <AtomColumn size={LayoutSize.FullSize}>
            <>
              {type === GithubPlotType.Calendar && (
                <GithubCalendarPlot data={data} year={_year} />
              )}
              {type === GithubPlotType.Accumulated && (
                <GithubRaceLinePlot data={data} year={_year} />
              )}
            </>
            {/* Controls */}
            <AtomRow
              alignment={LayoutAlign.CenterBetween}
              size={LayoutSize.FullWidth}
              smallDeviceAdjustment
            >
              <AtomDropdown
                onClick={setType}
                initialIndex={0}
                className={"w-32"}
                options={[
                  {
                    label: "Calendar",
                    value: GithubPlotType.Calendar,
                  },
                  {
                    label: "Accumulated",
                    value: GithubPlotType.Accumulated,
                  },
                ]}
              />
              <AtomButtonBar
                className={"px-4 md:px-0 w-fit"}
                items={buttonsProps}
                orientation={TabBarOrientation.Horizontal}
              />
              <AtomRow
                gap={LayoutGap.Medium}
                size={LayoutSize.None}
                className={"w-fit md:w-1/2"}
              >
                <AtomStats text={"Total Contributions"} value={total} />
                <AtomStats text={"Longest Streak"} value={longestStreak} />
                <AtomStats text={"Daily Average"} value={dailyAverage} />
              </AtomRow>
            </AtomRow>
          </AtomColumn>
        )}
        {!data && (
          <div
            className={"w-full h-fit flex items-center justify-center"}
            style={{ height: 1.2 * ChartHeight }}
          >
            {error && (
              <AtomTitleText className={"w-full h-fit text-center"}>
                {error.error
                  ? error.error
                  : "Not connected to internet, are you living in 18 century ?"}
              </AtomTitleText>
            )}
            {loading && <AtomLoader className={"w-full h-full"} />}
          </div>
        )}
      </AtomColumn>
    </div>
  );
};
