import {AtomCard, AtomCardProps} from "./atom-card";
import React from "react";


export interface AtomCardGridProps {
    items: Array<AtomCardProps>; // List of button props
}

const AtomCardGrid: React.FC<AtomCardGridProps> = ({items}) => {
    return (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8">
            {items.map((item, index) => (
                <div key={index}>
                    <AtomCard {...item}/>
                </div>
            ))}
        </div>
    );
};

export default AtomCardGrid;