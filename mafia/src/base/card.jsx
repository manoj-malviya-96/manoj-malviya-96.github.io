import React from 'react';

const Card = ({image, title, date, description, onClick}) => {
    return (<div
        className="card bg-transparent shadow-md h-full w-full z-0 hover:z-10 transition-all duration-300
                        rounded-lg cursor-pointer overflow-hidden sm:card-compact hover:shadow-lg hover:scale-105 active:scale-95"
        onClick={onClick}
    >
        {/* Background Image */}
        <div
            className="w-full h-full border-2 border-primary rounded-lg overflow-hidden"
            style={
                {
                    backgroundImage: `url(${image})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                }
            }
        >
            {/* Overlay */}
            <div className="w-full h-full bg-black bg-opacity-40 flex flex-col justify-end p-4">
                <h2 className="text-lg font-bold">{title}</h2>
                <p className="text-sm text-secondary-content ">{date}</p>
                {description && (<p className="hidden sm:inline text-sm text-secondary-content mt-2 line-clamp-2">
                    {description}
                </p>)}
            </div>
        </div>
    </div>);
};

export default Card;
