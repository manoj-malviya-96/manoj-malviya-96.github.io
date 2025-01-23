import React, { useEffect, useState } from "react";
import {
  AtomColumn,
  AtomRow,
  LayoutAlign,
  LayoutSize,
} from "../atoms/atom-layout";
import AtomCalendarChart from "../atoms/charts/atom-calendar-chart";
import { CurrentYear } from "../common/date";
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

const API_URL = "https://github-contributions-api.jogruber.de/v4/";
const ChartHeight = 210;

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

function transformDataForEChart(
  data: GithubApiResponse,
): Record<string, number> {
  const transformedData: Record<string, number> = {};
  data.contributions.forEach((activity) => {
    transformedData[activity.date] = activity.count;
  });
  return transformedData;
}

export const GithubCalendar = () => {
  // const [user, setUser] = useState<string>('manoj-malviya-96');
  const user = "manoj-malviya-96";
  const [data, setData] = useState<GithubApiResponse | null>(null);
  const [error, setError] = useState<GithubApiErrorResponse | null>(null);
  const [year, setYear] = useState<Year>(CurrentYear - 1);
  const [loading, setLoading] = useState<boolean>(false);

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

  return (
    <div className={"w-full h-full inline-block"}>
      <AtomColumn size={LayoutSize.FullSize}>
        {data && !loading && (
          <AtomColumn size={LayoutSize.FullSize}>
            <AtomCalendarChart
              data={transformDataForEChart(data)}
              year={year === "last" ? CurrentYear - 1 : year}
              unit={"contributions"}
              height={ChartHeight}
            />
            <AtomRow
              alignment={LayoutAlign.CenterBetween}
              size={LayoutSize.FullWidth}
              smallDeviceAdjustment
            >
              <AtomRow size={LayoutSize.FullWidth}>
                <AtomStats text={"Total Contributions"} value={total} />
                <AtomStats text={"Longest Streak"} value={longestStreak} />
                <AtomStats text={"Daily Average"} value={dailyAverage} />
              </AtomRow>
              <AtomButtonBar
                className={"px-4 md:px-0 w-fit"}
                items={buttonsProps}
                orientation={TabBarOrientation.Horizontal}
              />
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
