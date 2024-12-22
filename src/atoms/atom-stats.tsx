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
        <div className={`stat ${className} border-secondary border rounded-lg w-fit h-fit`}>
            <span className="stat-title">{text}</span>
            <span
                className={`stat-value ${severity}`}>{value}</span>
        </div>
    )
}

const AtomStats = React.memo(_AtomStats);
export default AtomStats;


