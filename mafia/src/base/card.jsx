import React from 'react';

const Card = ({image, title, date, description, onClick}) => {
    return (<div
        className="card shadow-md h-full w-full z-0 hover:z-10
                        border-primary border-2 rounded-lg transition-all duration-300
                        cursor-pointer hover:shadow-xl hover:scale-105 overflow-hidden
                        sm:card-compact active:scale-95"
        onClick={onClick}
    >
        {/* Background Image */}
        <div
            className="w-full h-full bg-cover bg-center"
            style={
                {
                    backgroundImage: `url(${image})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backdropFilter: 'brightness(0.69)'
                }
            }
        >
            {/* Overlay */}
            <div className="w-full h-full bg-black bg-opacity-40 flex flex-col justify-end p-4">
                <h2 className="text-white text-lg font-bold">{title}</h2>
                <p className="text-sm text-gray-300">{date}</p>
                {description && (<p className="hidden sm:inline text-sm text-gray-300 mt-2 line-clamp-2">
                    {description}
                </p>)}
            </div>
        </div>
    </div>);
};

export default Card;
