import React from "react";
import {AtomThemeSensitiveImage} from "./atom-image";


export enum TimelineOrientation {
	Vertical = 'timeline-vertical',
	Horizontal = 'timeline-horizontal'
}

interface AtomTimelineItemProps {
	date: string,
	title: string,
	icon?: string
	description?: string,
	onClick?: () => void
}

interface AtomTimelineProps {
	items: AtomTimelineItemProps[]
	layout?: TimelineOrientation
	className?: string
}


const AtomTimeline: React.FC<AtomTimelineProps> = React.memo(({
	                                                              items,
	                                                              layout = TimelineOrientation.Horizontal,
	                                                              className
                                                              }) => {
	items.sort((a, b) => {
		return a.date < b.date ? 1 : -1;
	});
	return (
		<ul className={`timeline w-fit h-full
                        ${layout}
                        ${className}`}>
			{items.map((item, index) => {
				return (
					<li key={index}
					    onClick={item.onClick}
					    className={'cursor-pointer hover:bg-secondary hover:text-secondary-content w-fit'}>
						{index !== 0 && <hr className={'bg-neutral'}/>}
						<div className="timeline-start">{item.date}</div>
						<div className="timeline-middle">
							{
								item.icon &&
                                <AtomThemeSensitiveImage
                                    src={item.icon}
                                    alt={'icon'}
                                    className={'w-8 h-8'}
                                />
							}
							{!item.icon && <i className={'fas fa-check-circle'}/>}
						</div>
						<div className="timeline-end p-4 h-fit">
							<h3 className="text-lg uppercase font-bold">{item.title}</h3>
							{item.description &&
                                <span className="text-small">{item.description}</span>
							}
						</div>
						{index !== items.length - 1 && <hr className={'bg-neutral'}/>}
					</li>
				);
			})}
		</ul>
	)
});
export default AtomTimeline;