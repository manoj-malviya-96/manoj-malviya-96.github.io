import React from 'react';

const Card = ({ image, title, date, description, width = '240px', height = '160px', onClick }) => {
    return (
        <div
            className="card shadow-md rounded-lg transition-all duration-300 cursor-pointer hover:shadow-xl hover:scale-105 overflow-hidden"
            style={{ width, height }}
            onClick={onClick}
        >
            {/* Background Image */}
            <div
                className="w-full h-full bg-cover bg-center"
                style={{ backgroundImage: `url(${image})` }}
            >
                {/* Overlay */}
                <div className="w-full h-full bg-black bg-opacity-40 flex flex-col justify-end p-4">
                    <h2 className="text-white text-lg font-bold">{title}</h2>
                    <p className="text-sm text-gray-300">{date}</p>
                    {description && (
                        <p className="text-sm text-gray-300 mt-2 line-clamp-2">
                            {description}
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Card;
