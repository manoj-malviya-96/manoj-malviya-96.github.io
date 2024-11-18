import React from 'react';
import {Card} from 'primereact/card';
import {Badge} from "primereact/badge";

const AtomCard = ({image, title, date, description, onClick, isNew = false, hasBorder = false}) => {
    const header = (
        <div className="relative">
            {isNew && (
                <Badge value="NEW" className="absolute top-0 right-0" severity="warning"/>
            )}
            <img
                src={image}
                alt={title}
                className="img-cover w-full h-full"
            />
        </div>
    );

    const footer = date && (
        <span className="w-fit whitespace-nowrap">{date}</span>
    );
    return (
        <Card
            title={title}
            subTitle={description}
            header={header}
            footer={footer}
            style={{ backgroundColor: 'rgba(0, 0, 0, 0)' }} // transparent background, overrides prime-react default
            className={`w-full h-full cursor-pointer 
                        overflow-clip rounded-lg
                        border-0 border-primary border-opacity-50
                        hover:border  ${hasBorder ? 'border' : ''}`}
            onClick={onClick}
        />
    );
}


export default AtomCard;
