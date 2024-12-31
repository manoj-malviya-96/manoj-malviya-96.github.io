import React from 'react'
import {AtomTitleText} from "./atom-text";

export enum StatSeverity {
	Primary = 'text-primary-content',
	Info = 'text-info',
	Success = 'text-success',
	Warning = 'text-warning',
	Danger = 'text-danger',
}


interface AtomStatsProps {
	text: string
	value: string | number
	className?: string
	severity?: StatSeverity
}


const AtomStats: React.FC<AtomStatsProps> =
	React.memo(({text, value, severity, className}) => {
		return (
			<div className={`stat ${className} w-fit h-fit cursor-auto`}>
				<AtomTitleText className="stat-title" text={text}/>
				<span
					className={`stat-value ${severity}`}>{value}</span>
			</div>
		)
	});

export default AtomStats;


