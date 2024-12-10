import React from 'react';
import {AtomCard} from './atom-card';
import {Timeline} from "primereact/timeline"; // Assuming you have a
                                              // Card component

export interface TimelineItemProps {
    image: string;
    title: string;
    date?: string;
    icon?: string;
    color?: string;
    
    onClick(): void;
}

interface TimelineProps {
    items: TimelineItemProps[];
}

const AtomTimeline: React.FC<TimelineProps> = ({items}) => {
    const makeMarker = (item: TimelineItemProps) => {
        return (
            <span
                className="flex w-2rem h-2rem align-items-center justify-content-center text-white border-circle z-1 shadow-1"
                style={{backgroundColor: item.color}}>
                <i className={item.icon}></i>
            </span>
        );
    };
    
    const makeCard = (item: TimelineItemProps) => {
        return (
            <AtomCard image={item.image} title={item.title}
                      onClick={item.onClick}/>
        );
    };
    
    return (
        <Timeline align="alternate" className="customized-timeline"
                  value={items} content={makeCard}
                  marker={makeMarker}/>
    )
}


export default AtomTimeline;
