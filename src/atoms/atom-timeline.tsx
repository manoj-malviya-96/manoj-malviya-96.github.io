import React from "react";
import AtomSvg from "./atom-svg";


interface AtomTimelineItemProps {
    date: string,
    title: string,
    icon?: string
    description?: string,
    onClick?: () => void
}

interface AtomTimelineProps {
    items: AtomTimelineItemProps[]
    layout?: 'vertical' | 'horizontal'
    className?: string
}


const _AtomTimeline: React.FC<AtomTimelineProps> = ({items, layout = 'vertical', className}) => {
    items.sort((a, b) => {
        return a.date < b.date ? 1 : -1;
    });
    return (
        <ul className={`timeline w-fit
                        ${layout === 'vertical' ? 'timeline-vertical' : 'timeline-horizontal'}
                        ${className}`}>
            {items.map((item, index) => {
                return (
                    <li key={index}
                        onClick={item.onClick}
                        className={'cursor-pointer hover:bg-secondary hover:text-secondary-content w-fit'}>
                        {index !== 0 && <hr className={'bg-accent'}/>}
                        <div className="timeline-start">{item.date}</div>
                        <div className="timeline-middle">
                            {
                                item.icon &&
                                <AtomSvg
                                    src={item.icon}
                                    alt={'icon'}
                                    className={'w-12 h-12'}
                                />
                            }
                            {!item.icon && <i className={'fas fa-check-circle'}/>}
                        </div>
                        <div className="timeline-end p-4">
                            <h3 className="text-lg uppercase font-bold">{item.title}</h3>
                            {item.description &&
                                <span className="text-small">{item.description}</span>
                            }
                        </div>
                        {index !== items.length - 1 && <hr className={'bg-accent'}/>}
                    </li>
                );
            })}
        </ul>
    )
}

const AtomTimeline = React.memo(_AtomTimeline);
export default AtomTimeline;