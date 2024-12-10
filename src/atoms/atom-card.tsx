import React from 'react';
import {Card} from 'primereact/card';
import {Badge} from "primereact/badge";
import MotionDiv from "./motion-div";
import AtomSvg from "./atom-svg";
import AtomImage from "./atom-image";


export interface AtomCardProps {
    image: string;
    title: string;
    date?: string;
    description?: string;

    onClick(): void;

    isNew?: boolean;
    hasBorder?: boolean;
    isLarge?: boolean;
}

export const AtomCard: React.FC<AtomCardProps> = ({
                                                      image,
                                                      title,
                                                      date,
                                                      description,
                                                      onClick,
                                                      isNew = false,
                                                      hasBorder = false,
                                                      isLarge = false,
                                                  }) => {

    const header = (
        <div className="relative justify-center items-center">
            {isNew && (
                <Badge value="NEW" className="badge absolute top-0 right-0
                                    px-2 rounded-badge" severity="info"/>
            )}
            {image.endsWith('.svg') && <AtomSvg
                src={image}
                alt={title}
                className={`object-cover m-auto w-32 h-32`}
            />}
            {!image.endsWith('.svg') &&
                <AtomImage src={image} alt={title} preview={false}/>}
        </div>
    );

    const footer = (
        <div className="w-full h-full justify-center items-center">
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
    const cardSize = isLarge ? 'w-full h-full' : 'w-64 h-64';
    return (
        <MotionDiv>
            <Card
                header={header}
                footer={footer}
                style={{
                    backgroundColor: 'rgba(0, 0, 0, 0)'
                }} // transparent background, overrides prime-react default
                className={`${cardSize} cursor-pointer 
                        overflow-clip rounded-lg text-primary
                        border-0 border-primary border-opacity-50
                        hover:border  ${hasBorder ? 'border' : ''}`}
                onClick={onClick}
            />
        </MotionDiv>
    );
}
