import React from 'react';
import AtomSimpleMotionContainer from "./atom-simple-motion-container";
import {BentoBoxItemProps} from "./atom-bentobox";
import {AtomDateAndText, AtomSecondaryText, AtomTitleText} from "./atom-text";
import {AtomColumn, AtomLayoutGap, AtomLayoutSize} from "./atom-layout";

export interface AtomCardProps extends BentoBoxItemProps {
	image: string;
	title: string;
	description?: string;
	date?: string;
	onClick?: () => void;
	isNew?: boolean;
	className?: string;
	category?: string;
}

export const AtomImageCard: React.FC<AtomCardProps> = React.memo(({
	                                                                  image,
	                                                                  title,
	                                                                  description,
	                                                                  date,
	                                                                  onClick,
	                                                                  category,
	                                                                  isNew = false,
	                                                                  className = '',
                                                                  }) => {
	return (
		<div
			className={`relative cursor-pointer overflow-hidden group ${className}`}
			onClick={onClick}
			style={{
				backgroundImage: `url(${image})`,
				backgroundSize: 'cover',
				backgroundPosition: 'center',
				backgroundRepeat: 'no-repeat',
				width: '100%',
				height: '100%',
			}}
		>
			<div
				className="w-full h-full p-2 flex flex-col items-center justify-center
                            opacity-0 group-hover:opacity-100 transition-opacity duration-300
                            group-hover:bg-secondary group-hover:text-secondary-content">
				
				<h2 className="card-title text-center">{title}</h2>
				{isNew && <span className="badge badge-info">New</span>}
				{date && (
					<span className="text-sm text-center">
                        <i className={`fas fa-calendar-alt mr-2`}/>
						{date}
                    </span>
				)}
				{description && (
					<p className="text-sm font-sans text-center">
						{description}
					</p>
				)}
			</div>
			<span className="absolute left-0 top-0 p-2 group-hover:opacity-0
                            text-white font-bold uppercase">{title}
			</span>
			{category && <AtomSecondaryText text={category}/>}
		
		</div>
	);
});

export const AtomSimpleCard: React.FC<AtomCardProps> = React.memo(({
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
				size={AtomLayoutSize.None}
				className={`cursor-pointer overflow-hidden p-4 transition ${className}`}>
				<img
					src={image}
					alt={title}
					loading="lazy"
					className="w-full h-2/3 object-contain"
				/>
				<AtomColumn gap={AtomLayoutGap.None}>
					<AtomTitleText text={title} className={'text-center'}/>
					{isNew && <span className="badge badge-info">New</span>}
					{date && (
						<AtomDateAndText text={date}/>
					)}
					{description && (
						<AtomSecondaryText text={description} className={'text-center'}/>
					)}
				</AtomColumn>
			</AtomColumn>
		</AtomSimpleMotionContainer>
	);
});

export default AtomSimpleCard;


export interface AtomCardGridProps {
	items: Array<AtomCardProps>;
	classNameForCard?: string;
}

export const AtomCardGrid: React.FC<AtomCardGridProps> = ({items, classNameForCard}) => {
	return (
		<div className="grid grid-cols-2 lg:grid-cols-4 gap-8 items-stretch">
			{items.map((item, index) => (
				<div key={index} className="flex">
					<AtomSimpleCard {...item}
					                className={`flex-grow h-full ${classNameForCard}`}/>
				</div>
			))}
		</div>
	);
};

export const AtomImageCardGrid: React.FC<AtomCardGridProps> = ({items, classNameForCard}) => {
	return (
		<div className="grid grid-cols-2 lg:grid-cols-4 gap-8 items-stretch">
			{items.map((item, index) => (
				<div key={index} className="flex">
					<AtomImageCard {...item}
					               className={`flex-grow h-full ${classNameForCard}`}/>
				</div>
			))}
		</div>
	);
};
