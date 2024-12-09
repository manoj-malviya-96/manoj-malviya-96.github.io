import React from 'react';
import {Card} from 'primereact/card';
import {Badge} from "primereact/badge";
import MotionDiv from "./motion-div";


export interface AtomCardProps {
    image: string;
    title: string;
    date?: string;
    description?: string;

    onClick(): void;

    isNew?: boolean;
    hasBorder?: boolean;
}

export const AtomCard: React.FC<AtomCardProps> = ({
                                                      image,
                                                      title,
                                                      date,
                                                      description,
                                                      onClick,
                                                      isNew = false,
                                                      hasBorder = false
                                                  }) => {
    const header = (
        <div className="relative">
            {isNew && (
                <Badge value="NEW" className="badge absolute top-0 right-0 px-2 rounded-badge" severity="danger"/>
            )}
            <img
                src={image}
                alt={title}
                className="object-cover w-full h-full"
            />
        </div>
    );

    const footer = (
        <div>
            {title && <h2 className="text-2xl text-primary-content font-bold uppercase">{title}</h2>}
            {description && <p className="text-sm text-primary-content">{description}</p>}
            {date &&
                <div className="flex flex-row gap-2">
                    <i className="pi pi-calendar text-primary-content"/>
                    <span className="text-sm text-primary-content">{date}</span>
                </div>
            }
        </div>
    );

    return (
        <MotionDiv enableHoverEffect={false}>
            <Card
                header={header}
                footer={footer}
                style={{
                    backgroundColor: 'rgba(0, 0, 0, 0)'
                }} // transparent background, overrides prime-react default
                className={`w-full h-full cursor-pointer 
                        overflow-clip rounded-lg text-primary
                        border-0 border-primary border-opacity-50
                        hover:border  ${hasBorder ? 'border' : ''}`}
                onClick={onClick}
            />
        </MotionDiv>
    );
}
