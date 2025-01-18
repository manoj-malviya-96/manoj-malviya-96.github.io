import React, {useEffect, useState} from "react";
import {AtomColumn, AtomLayoutSize} from "../atoms/atom-layout";
import AtomCalendarChart from "../atoms/charts/atom-calendar-chart";
import {CurrentYear} from "../common/date";
import {AtomSuperHeroTitleText} from "../atoms/atom-text";
import {AtomLoader} from "../atoms/atom-loader";
import AtomStats from "../atoms/atom-stats";
import {aRange} from "../common/math";
import {AtomButtonBar, TabBarOrientation, TabButtonProps} from "../atoms/atom-bars";

const API_URL = 'https://github-contributions-api.jogruber.de/v4/'

export interface Activity {
	date: string
	count: number
	level: 0 | 1 | 2 | 3 | 4
}

type Year = number | 'last'

export interface GithubApiResponse {
	total: {
		[year: number]: number
		[year: string]: number
	}
	contributions: Array<Activity>
}

export interface GithubApiErrorResponse {
	error: string
}

interface FetchGithubDataOptions {
	username: string
	year?: Year
}

export const fetchGithubData = async ({username, year}: FetchGithubDataOptions) => {
	year = year || 'last'
	const response = await fetch(`${API_URL}${username}?y=${year}`)
	const data = (
		await response.json()
	) as GithubApiResponse | GithubApiErrorResponse
	if (!response.ok) {
		throw new Error(`Fetching GitHub contribution data for "${username}" failed: ${(
			data as GithubApiErrorResponse
		).error}`)
	}
	return data as GithubApiResponse
};


function transformDataForEChart(data: GithubApiResponse): Record<string, number> {
	const transformedData: Record<string, number> = {}
	data.contributions.forEach((activity) => {
		transformedData[activity.date] = activity.count
	})
	return transformedData
}

export const GithubCalendar = () => {
	// const [user, setUser] = useState<string>('manoj-malviya-96');
	const user = 'manoj-malviya-96';
	const [data, setData] = useState<GithubApiResponse | null>(null);
	const [error, setError] = useState<GithubApiErrorResponse | null>(null);
	const [year, setYear] = useState<Year>(CurrentYear - 1);
	const [loading, setLoading] = useState<boolean>(false);
	
	useEffect(() => {
		setLoading(true);
		// Fetch new data
		fetchGithubData({
			username: user,
			year: year
		}).then((data: GithubApiResponse) => setData(data))
			.catch((error: GithubApiErrorResponse) => setError(error))
		setLoading(false);
	}, [user, year, setData, setError])
	
	
	const height = 210;
	const buttonsProps = aRange(CurrentYear, 5, -1).map((year) => (
		{
			label: year.toString(),
			onClick: () => setYear(year),
		} as TabButtonProps
	))
	
	return (
		<div className={'w-full h-full inline-block'}>
			<AtomButtonBar
				className={'w-fit'}
				items={buttonsProps}
				orientation={TabBarOrientation.Horizontal}
			/>
			<AtomColumn size={AtomLayoutSize.FullSize}>
				{(
						data && !loading
					) &&
                    <AtomColumn size={AtomLayoutSize.FullSize}>
                        <AtomCalendarChart data={transformDataForEChart(data)}
                                           year={year === 'last' ? CurrentYear - 1 : year}
                                           unit={'contributions'} height={height}/>
                        <AtomStats text={'Total Contributions'} value={data.total[year]}/>
                    </AtomColumn>
				}
				{!data &&
                    <div className={'w-full h-fit border-2'} style={{height: height}}>
						{error &&
                            <AtomSuperHeroTitleText
                                className={'w-full h-full'}>{error.error}</AtomSuperHeroTitleText>}
						{loading && <AtomLoader height={height} width={height}/>}
                    </div>
				}
			</AtomColumn>
		</div>
	)
}