import React from 'react';
import AtomSimpleMotionContainer from "./atom-simple-motion-container";

export interface AtomCardProps {
    image: string;
    title: string;
    description?: string;
    date?: string;
    onClick?: () => void;
    isNew?: boolean;
    className?: string;
}

export const AtomImageCard: React.FC<AtomCardProps> = React.memo(({
                                                                      image,
                                                                      title,
                                                                      description,
                                                                      date,
                                                                      onClick,
                                                                      isNew = false,
                                                                      className = '',
                                                                  }) => {
    return (
        <div
            className={`relative cursor-pointer overflow-hidden group ${className}`}
            onClick={onClick}
            style={{
                backgroundImage: `url(${image})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
            }}
        >
            <div
                className="w-full h-full p-8 flex flex-col items-center justify-center
                            opacity-0 group-hover:opacity-100 transition-opacity duration-300
                            group-hover:bg-secondary group-hover:text-secondary-content">
                <h2 className="card-title text-center">{title}</h2>
                {isNew && <span className="badge badge-info">New</span>}
                {date && (
                    <span className="text-sm text-center">
                        <i className={`fas fa-calendar-alt mr-2`}/>
                        {date}
                    </span>
                )}
                {description && (
                    <p className="text-sm font-sans text-center">
                        {description}
                    </p>
                )}
            </div>
            <span className="absolute left-0 bottom-0 p-2 group-hover:opacity-0
                            text-neutral text-sm uppercase">{title}</span>
        </div>
    );
});

export const AtomSimpleCard: React.FC<AtomCardProps> = React.memo(({
                                                                       image,
                                                                       title,
                                                                       description,
                                                                       date,
                                                                       onClick,
                                                                       isNew = false,
                                                                       className = '',
                                                                   }) => {
    return (
        <AtomSimpleMotionContainer enableHoverEffect={true}>
            <div
                className={`cursor-pointer overflow-hidden p-4
                            flex flex-col items-center justify-center transition ${className}`}
                onClick={onClick}
            >
                <img
                    src={image}
                    alt={title}
                    loading="lazy"
                    className="w-full h-2/3 object-contain"
                />
                <div className="w-full flex flex-col items-center gap-2 mt-4 p-2">
                    <h2 className="card-title text-center">{title}</h2>
                    {isNew && <span className="badge badge-info">New</span>}
                    {date && (
                        <span className="text-sm text-neutral text-center">
                            {date}
                        </span>
                    )}
                    {description && (
                        <p className="text-sm font-sans text-neutral text-center">
                            {description}
                        </p>
                    )}
                </div>
            </div>
        </AtomSimpleMotionContainer>
    );
});

export default AtomSimpleCard;
