import React from "react";
import AtomBentoBox, {BentoBoxItemProps} from "./atom-bentobox";
import {AtomHeroTitleText, AtomLink, AtomLinkProps, AtomSecondaryText, AtomTitleText} from "./atom-text";


export interface AtomHeroGridItemProps extends BentoBoxItemProps {
	summary: string;
	title?: string;
	icon?: string;
	link?: AtomLinkProps;
	className?: string;
}

interface AtomHeroGridProps {
	contentList: Array<AtomHeroGridItemProps>;
	className?: string;
}


const AtomHeroGridItem: React.FC<AtomHeroGridItemProps> = React.memo(({icon, title, summary, link, className}) => {
	const hasSub = title || icon;
	return (
		<div className={`flex flex-col gap-4 rounded-lg p-8 w-full h-full
                                        transition duration-300 items-start justify-start
                                        hover:bg-secondary hover:text-secondary-content
                                        cursor-auto border border-neutral border-opacity-50 ${className}`}>
			{hasSub &&
                <div className={'flex flex-row gap-4 w-full'}>
					{icon && <i className={`${icon} text-3xl`}/>}
					{title && <AtomTitleText>{title}</AtomTitleText>}
                </div>
			}
			<AtomSecondaryText className={'w-full'}>{summary}</AtomSecondaryText>
			{link && <AtomLink {...link}/>}
		</div>
	);
});


const AtomHeroGrid: React.FC<AtomHeroGridProps> = React.memo(({
	                                                              contentList,
	                                                              className = ''
                                                              }) => {
	return (
		<AtomBentoBox
			className={`${className} w-full h-fit`}
			items={contentList}
			columns={2}
			component={AtomHeroGridItem as unknown as React.ComponentType<BentoBoxItemProps>}
		/>
	);
});

export default AtomHeroGrid;