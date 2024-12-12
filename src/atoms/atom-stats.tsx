import React from 'react'


interface AtomStatsProps {
    text: string
    value: string | number
    className?: string
}


const _AtomStats: React.FC<AtomStatsProps> = ({text, value, className}) => {
    return (
        <div className={`stat ${className}`}>
            <div className="stat-title">{text}</div>
            <div
                className="stat-value">{value}</div>
        </div>
    )
}

const AtomStats = React.memo(_AtomStats);
export default AtomStats;


