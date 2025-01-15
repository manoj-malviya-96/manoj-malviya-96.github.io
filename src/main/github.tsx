import {DayToMs} from "../common/date";
import {useEffect, useState} from "react";

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


class GithubDataFetcher {
	private readonly username: string;
	data: GithubApiResponse | null;
	
	constructor(username: string) {
		this.username = username;
		this.data = null;
	}
	
	async updateData(year: Year = 'last') {
		this.data = await fetchGithubData({username: this.username, year});
	}
}

interface GithubCalendarProps {
	fetcher: GithubDataFetcher | null
}

const GithubCalendar = ({fetcher}: GithubCalendarProps) => {
	const [data, setData] = useState<GithubApiResponse | null>(null)
	const [year, setYear] = useState<Year>('last')
	
	useEffect(() => {
		if (fetcher) {
			fetcher.updateData(year).then(() => {
				setData(fetcher.data)
			})
		}
	}, [fetcher, year])
	
	if (!data) {
		return <div>Loading...</div>
	}
	
	
}