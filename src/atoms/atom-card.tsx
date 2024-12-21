import React from 'react';
import AtomSimpleMotionContainer from "./atom-simple-motion-container";


export interface AtomCardProps {
    image: string;
    title: string;
    date?: string;
    description?: string;
    
    onClick(): void;
    
    centered?: boolean;
    isNew?: boolean;
    className?: string;
}

const _AtomCard: React.FC<AtomCardProps> = ({
                                                image,
                                                title,
                                                date,
                                                description,
                                                onClick,
                                                centered = false,
                                                isNew = false,
                                                className = '',
                                            }) => {
    
    return (
        <AtomSimpleMotionContainer>
            <div
                className={`cursor-pointer rounded-lg border border-primary border-opacity-0 hover:border-opacity-100
                            ${className}`}
                onClick={onClick}
            >
                {image && (
                    <img src={image} alt={title} loading={'lazy'}
                         className="w-full h-2/3 object-contain"/>
                )}
                
                <div className={`w-full min-h-1/3 h-fit
                                flex flex-col flex-wrap
                                gap-0 mt-4 p-2
                            ${centered ? 'justify-center items-center' : ''} `}>
                    
                    <span className="flex flex-row gap-2 items-center">
                        <h2 className="card-title">{title}</h2>
                        {isNew && <span
                            className="badge badge-info">New</span>}
                    </span>
                    
                    {date &&
                        <span className="flex flex-row items-center text-sm text-secondary-content gap-2">
                            {date}
                            <i className="far fa-calendar-alt"/>
                        </span>
                    }
                    {description &&
                        <p className={`text-sm font-sans w-full text-secondary
                            ${centered ? 'text-center' : ''}`}>{description}</p>}
                </div>
            </div>
        </AtomSimpleMotionContainer>
    );
}
export const AtomCard = React.memo(_AtomCard);
export default AtomCard;
