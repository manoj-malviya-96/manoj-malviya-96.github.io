import React from 'react';
import {Card} from 'primereact/card';
import {Badge} from "primereact/badge";
import MotionDiv from "./motion-div";
import AtomImage from "./atom-image";


export interface AtomCardProps {
    image: string;
    title: string;
    date?: string;
    description?: string;
    
    onClick(): void;
    
    isNew?: boolean;
    hasBorder?: boolean;
    centerAlign?: boolean;
    className?: string;
}

export const AtomCard: React.FC<AtomCardProps> = ({
                                                      image,
                                                      title,
                                                      date,
                                                      description,
                                                      onClick,
                                                      isNew = false,
                                                      hasBorder = false,
                                                      centerAlign = false,
                                                      className = '',
                                                  }) => {
    
    const centerAlignClass = centerAlign ? 'm-auto text-center' : '';
    
    const children = (
        <div className='w-full h-full flex flex-col gap-6'>
            <div className="relative justify-center items-center">
                {isNew && (
                    <Badge value="NEW" className="badge absolute top-0 right-0
                                    px-2 rounded-badge"
                           severity="info"/>
                )}
                {image.endsWith('.svg') && <img
                    src={image}
                    alt={title}
                    className={`object-cover m-auto`}
                />}
                {!image.endsWith('.svg') &&
                 <AtomImage src={image} alt={title}
                            preview={false}/>}
            </div>
            <div className="w-fit h-fit flex flex-col gap-2">
                {title && <h2 className={`text-2xl text-primary-content 
                    font-bold uppercase ${centerAlignClass}`}>{title}</h2>}
                
                {description && <p className={`w-40 text-sm text-primary-content 
                    ${centerAlignClass}`}>
                    {description}</p>
                }
                {date &&
                 <div className="flex flex-row gap-2">
                     <i className="pi pi-calendar text-primary-content"/>
                     <span
                         className="text-sm text-primary-content">{date}</span>
                 </div>
                }
            </div>
        </div>
    );
    return (
        <MotionDiv>
            <Card
                children={children}
                style={{
                    backgroundColor: 'rgba(0, 0, 0, 0)',
                    boxShadow: 'none',
                }} // transparent background, overrides prime-react
                   // default
                className={`w-full cursor-pointer rounded-lg text-primary 
                        border border-opacity-0 border-primary 
                        shadow-none flex-grow h-full
                        hover:border-opacity-100  
                        ${hasBorder ? 'border-opacity-100' : ''} ${className}`}
                onClick={onClick}
            />
        </MotionDiv>
    );
}
