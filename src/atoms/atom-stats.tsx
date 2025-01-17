import React from 'react'
import {AtomColumn, AtomLayoutAlignment, AtomLayoutGap} from "./atom-layout";
import {AtomHeroTitleText, AtomSecondaryText} from "./atom-text";

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
			<AtomColumn className={className} alignment={AtomLayoutAlignment.Center} gap={AtomLayoutGap.None}>
				<AtomSecondaryText>{text}</AtomSecondaryText>
				<AtomHeroTitleText className={severity}>{value}</AtomHeroTitleText>
			</AtomColumn>
		)
	});

export default AtomStats;


