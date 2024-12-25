import React from 'react'

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


const _AtomStats: React.FC<AtomStatsProps> = ({text, value, severity, className}) => {
    return (
        <div className={`stat ${className} rounded-lg w-fit h-fit cursor-auto
                        hover:bg-secondary hover:text-secondary-content`}>
            <h2 className="stat-title">{text}</h2>
            <span
                className={`stat-value ${severity}`}>{value}</span>
        </div>
    )
}

const AtomStats = React.memo(_AtomStats);
export default AtomStats;


