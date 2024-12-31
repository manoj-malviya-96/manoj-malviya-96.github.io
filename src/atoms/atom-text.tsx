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
		<h2 className={`text-3xl font-bold ${className}`}>{text}</h2>
	);
}

export const AtomSuperHeroTitleText: React.FC<AtomTextProps> = ({text, className = ''}) => {
	return (
		<h1 className={`text-4xl font-bold uppercase text-center ${className}`}>{text}</h1>
	)
}


export interface AtomLinkProps extends AtomTextProps {
	url: string;
}

export const AtomLink: React.FC<AtomLinkProps> = ({text, url, className = ''}) => {
	return (
		<a href={url} className={`text-primary-content hover:text-accent
                                    text-sm underline ${className}`}>{text}</a>
	);
}

export const AtomDateAndText: React.FC<AtomTextProps> = ({text, className = ''}) => {
	return (
		<span className={`text-sm opacity-70 ${className}`}><i className='fas fa-calendar-days'></i> {text}</span>
	);
}