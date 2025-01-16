import React, {useEffect, useState} from "react";
import {AtomColumn, AtomLayoutGap, AtomLayoutSize, AtomRow} from "../atoms/atom-layout";
import AtomCalendarChart from "../atoms/charts/atom-calendar-chart";
import {CurrentYear} from "../common/date";
import {AtomSuperHeroTitleText} from "../atoms/atom-text";
import {AtomLoader} from "../atoms/atom-loader";
import AtomButton, {ButtonType} from "../atoms/atom-button";
import AtomStats from "../atoms/atom-stats";
import {aRange} from "../common/math";


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
	const [user, setUser] = useState<string>('manoj-malviya-96');
	const [data, setData] = useState<GithubApiResponse | null>(null);
	const [error, setError] = useState<GithubApiErrorResponse | null>(null);
	const [year, setYear] = useState<Year>('last');
	
	useEffect(() => {
		setError(null);
		setData(null);
		// Fetch new data
		fetchGithubData({
			username: user,
			year: year
		}).then((data: GithubApiResponse) => setData(data))
			.catch((error: GithubApiErrorResponse) => setError(error))
	}, [user, year, setData, setError])
	
	const height = 210;
	
	return (
		<AtomRow size={AtomLayoutSize.FullSize}>
			<AtomColumn size={AtomLayoutSize.FullSize}>
				<div className={'w-full h-full flex items-center justify-center'}>
					{data && <AtomCalendarChart data={transformDataForEChart(data)}
                                                year={year === 'last' ? CurrentYear - 1 : year}
                                                unit={'contributions'} height={height}/>
					}
					{error &&
                        <AtomSuperHeroTitleText className={'w-full h-full'}>{error.error}</AtomSuperHeroTitleText>}
					{!error && !data && <AtomLoader height={height} width={height}/>}
				</div>
				<AtomRow>
					<AtomStats text={'Total Contribution'} value={data ? data.total[year] : 'N/A'} />
				</AtomRow>
			</AtomColumn>
			<AtomColumn gap={AtomLayoutGap.None} size={AtomLayoutSize.Fit}>
				{aRange(CurrentYear, 4, -1).map((year) => (
					<AtomButton
						type={ButtonType.Ghost}
						label={year.toString()}
						onClick={() => setYear(year)}
					/>
				))
				}
			</AtomColumn>
		</AtomRow>
	)
	
	
}