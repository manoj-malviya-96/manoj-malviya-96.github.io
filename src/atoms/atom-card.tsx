import React from 'react';
import AtomSimpleMotionContainer from "./atom-simple-motion-container";
import {BentoBoxItemProps} from "./atom-bentobox";
import {AtomDateAndText, AtomSecondaryText, AtomTitleText} from "./atom-text";
import {AtomColumn, AtomGrid, LayoutGap, LayoutSize, GridColumns} from "./atom-layout";

export interface AtomCardProps extends BentoBoxItemProps {
	image: string;
	imageOverlay?: React.ReactNode;
	title: string;
	description?: string;
	date?: string;
	onClick?: () => void;
	isNew?: boolean;
	className?: string;
	category?: string;
}

export const AtomCard: React.FC<AtomCardProps> = React.memo(({
	                                                             image,
	                                                             title,
	                                                             description,
	                                                             date,
	                                                             onClick,
	                                                             isNew = false,
	                                                             className = '',
                                                             }) => {
	return (
		<AtomSimpleMotionContainer enableHoverEffect={true}>
			<AtomColumn
				onClick={onClick}
				size={LayoutSize.None}
				className={`bg-transparent
							border border-secondary border-opacity-0 hover:border-opacity-50 rounded-lg
							cursor-pointer overflow-hidden p-4 transition ${className}`}>
				<img
					src={image}
					alt={title}
					loading="lazy"
					className="w-full h-2/3 object-contain"
				/>
				<AtomColumn gap={LayoutGap.None}>
					<AtomTitleText children={title} className={'text-center'}/>
					{isNew && <span className="badge badge-info">New</span>}
					{date && (
						<AtomDateAndText children={date}/>
					)}
					{description && (
						<AtomSecondaryText children={description} className={'text-center'}/>
					)}
				</AtomColumn>
			</AtomColumn>
		</AtomSimpleMotionContainer>
	);
});

export default AtomCard;


export interface AtomCardGridProps {
	items: Array<AtomCardProps>;
	className?: string;
}

export const AtomCardGrid: React.FC<AtomCardGridProps> = ({items, className}) => {
	return (
		<AtomGrid className={className}
		          size={LayoutSize.None}
		          gap={LayoutGap.Small}
		          nCols={GridColumns.Four}>
			{items.map((item, index) => (
				<AtomCard {...item} key={index}/>
			))}
		</AtomGrid>
	);
};
