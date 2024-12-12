import React from 'react';
import {AtomCard} from './atom-card';
import {Timeline} from "primereact/timeline";
import {parseDate} from "../common/date"; // Assuming you have a
                                              // Card component

export interface TimelineItemProps {
    image: string;
    title: string;
    date: string;
    description?: string;
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
                className="flex w-2rem h-2rem align-items-center j
                ustify-content-center border-circle text-primary-content">
                <i className={item.icon ? item.icon : 'pi pi-circle'}></i>
            </span>
        );
    };
    
    const makeCard = (item: TimelineItemProps) => {
        return (
            <AtomCard image={item.image} title={item.title} description={item.description}
                      centerAlign={true}
                      onClick={item.onClick}/>
        );
    };
    
    // Sort descending by date
    items.sort((a, b) => {return parseDate(b.date) - parseDate(a.date)});
    return (
        <Timeline align="alternate" className="customized-timeline"
                  value={items} content={makeCard}
                  marker={makeMarker}/>
    )
}


export default AtomTimeline;
