import React from "react";


interface AtomTextProps {
    text: string;
    className?: string;
}


export const AtomSecondaryText: React.FC<AtomTextProps> = ({text, className = ''}) => {
    return (
        <span className={`text-sm opacity-70 ${className}`}>{text}</span>
    );
}

export const AtomPrimaryText: React.FC<AtomTextProps> = ({text, className = ''}) => {
    return (
        <span className={`${className}`}>{text}</span>
    );
}

export const AtomTitleText: React.FC<AtomTextProps> = ({text, className = ''}) => {
    return (
        <h2 className={`text-2xl font-bold ${className}`}>{text}</h2>
    );
}

export const AtomHeroTitleText: React.FC<AtomTextProps> = ({text, className = ''}) => {
    return (
        <h1 className={`text-4xl font-bold uppercase ${className}`}>{text}</h1>
    )
}