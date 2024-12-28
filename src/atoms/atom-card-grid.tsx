import AtomSimpleCard, {AtomCardProps} from "./atom-card";
import React from "react";


export interface AtomCardGridProps {
    items: Array<AtomCardProps>;
    classNameForCard?: string;
}

const AtomCardGrid: React.FC<AtomCardGridProps> = ({items, classNameForCard}) => {
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

export default AtomCardGrid;