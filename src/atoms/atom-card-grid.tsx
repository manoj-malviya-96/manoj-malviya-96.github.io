import {AtomCard, AtomCardProps} from "./atom-card";
import React from "react";


export interface AtomCardGridProps {
    items: Array<AtomCardProps>; // List of button props
}

const AtomCardGrid: React.FC<AtomCardGridProps> = ({items}) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4
                        gap-8 items-stretch">
            {items.map((item, index) => (
                <div key={index} className="flex">
                    <AtomCard {...item}
                              className="flex-grow h-full"/>
                </div>
            ))}
        </div>
    );
};

export default AtomCardGrid;