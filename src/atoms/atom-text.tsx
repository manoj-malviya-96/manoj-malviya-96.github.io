import React, {useCallback} from "react";
import {AtomColumn, AtomLayoutAlignment, AtomLayoutGap} from "./atom-layout";
import AtomButton, {ButtonSeverity, ButtonSize} from "./atom-button";


interface AtomTextProps {
	text: string;
	className?: string;
}

export const AtomTertiaryText: React.FC<AtomTextProps> = ({text, className = ''}) => {
	return (
		<span className={`text-xs opacity-70 ${className}`}>{text}</span>
	);
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
		<h2 className={`text-3xl font-extrabold ${className}`}>{text}</h2>
	);
}

export const AtomHeroBrandTitleText: React.FC<AtomTextProps> = ({text, className = ''}) => {
	return (
		<h1 className={`text-3xl font-bold bg-gradient-to-r from-red-700 to-red-300
						bg-clip-text text-transparent ${className}`}>
			{text}
		</h1>
	)
}

export const AtomSuperHeroTitleText: React.FC<AtomTextProps> = ({text, className = ''}) => {
	return (
		<h1 className={`text-4xl font-bold uppercase text-center ${className}`}>{text}</h1>
	)
}


export const AtomSuperHeroBrandTitleText: React.FC<AtomTextProps> = ({text, className = ''}) => {
	return (
		<h1 className={`text-4xl font-bold uppercase bg-gradient-to-r from-red-700 to-red-300
						bg-clip-text text-transparent ${className}`}>{text}</h1>
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


export const AtomAccentBadge: React.FC<AtomTextProps> = ({text, className = ''}) => {
	return (
		<span className={`badge badge-accent rounded-md ${className}`}>{text}</span>
	);
}

export const AtomPrimaryBadge: React.FC<AtomTextProps> = ({text, className = ''}) => {
	return (
		<span className={`badge badge-primary rounded-md ${className}`}>{text}</span>
	);
}

export const AtomSecondaryBadge: React.FC<AtomTextProps> = ({text, className = ''}) => {
	return (
		<span className={`badge badge-secondary rounded-md ${className}`}>{text}</span>
	);
}


interface AtomParagraphProps {
	texts: string[];
	className?: string;
}

export const AtomPrimaryParagraph: React.FC<AtomParagraphProps> = ({texts, className}) => {
	return (
		<AtomColumn className={className}>
			{texts.map((text, index) => (
				<AtomPrimaryText key={index} text={text}/>
			))}
		</AtomColumn>
	)
}

export const AtomSecondaryParagraph: React.FC<AtomParagraphProps> = ({texts, className}) => {
	return (
		<AtomColumn className={className}>
			{texts.map((text, index) => (
				<AtomSecondaryText key={index} text={text}/>
			))}
		</AtomColumn>
	);
}


interface AtomClippedTextProps {
	textComponentConstructor: (props: AtomTextProps) => React.ReactNode;
	fullText: string;
	maxLength: number;
	className?: string;
}

export const AtomClippedText: React.FC<AtomClippedTextProps> = React.memo(({
	                                                                           textComponentConstructor,
	                                                                           fullText,
	                                                                           maxLength,
	                                                                           className = ''
                                                                           }) => {
	const [clipped, setClipped] = React.useState(fullText.length > maxLength);
	const [text, setText] = React.useState<string>(clipped ? fullText.slice(0, maxLength) + '...' : fullText);
	
	React.useEffect(() => {
		setText(clipped ? fullText.slice(0, maxLength) + '... ' : fullText);
	}, [fullText, maxLength, clipped]);
	
	const renderComponent = useCallback(() => {
		return textComponentConstructor({text, className});
	}, [text, className, textComponentConstructor]);
	
	return <AtomColumn gap={AtomLayoutGap.None} alignment={AtomLayoutAlignment.Start}>
		{renderComponent()}
		<AtomButton
			pill={false}
			severity={ButtonSeverity.Info}
			size={ButtonSize.Small}
			icon={clipped ? 'fas fa-chevron-down' : 'fas fa-chevron-up'}
			label={clipped ? 'Show More' : 'Show Less'}
			onClick={() => setClipped(!clipped)}
		/>
	</AtomColumn>;
});