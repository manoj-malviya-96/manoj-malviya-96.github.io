import React from 'react';
import {AtomCard} from './atom-card';
import {Timeline} from "primereact/timeline";
import {parseDate} from "../common/date";
import {useTheme} from "../providers/theme";

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
    orientation?: 'vertical' | 'horizontal';
}

const AtomTimeline: React.FC<TimelineProps> = ({items, orientation = 'vertical'}) => {
    const {daisyPrimary} = useTheme();
    const makeMarker = (item: TimelineItemProps) => {
        return (
            <span
                className="flex w-2rem h-2rem align-items-center j
                ustify-content-center border-circle text-primary-content">
                <i className={item.icon ? item.icon : 'fas fa-circle'}></i>
            </span>
        );
    };
    
    const makeCard = (item: TimelineItemProps) => {
        return (
            <AtomCard image={item.image} title={item.title} description={item.description}
                      className="w-full"
                      onClick={item.onClick}/>
        );
    };
    
    // Sort descending by date
    items.sort((a, b) => {
        return parseDate(b.date) - parseDate(a.date)
    });
    
    const stylePt = {
        connector: {
            style: {
                backgroundColor: daisyPrimary,
            }
        }
    }
    
    return (
        <Timeline align="alternate" className="customized-timeline p-4"
                  value={items}
                  content={makeCard}
                  layout={orientation}
                  marker={makeMarker}
                  pt={stylePt}/>
    )
}


export default AtomTimeline;
