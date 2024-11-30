import React from 'react';

const Card = ({image, title, date, description, onClick, isNew = false, hasBorder = false}) => {
    return (
        <div
            className={`card card-compact bg-transparent w-full h-full z-0
                       cursor-pointer rounded-lg overflow-clip
                       transition-transform duration-300
                       ${hasBorder ? "border-2" : ""}
                       hover:border-2 border-neutral border-opacity-30
                       active:scale-90 hover:scale-105 backdrop-blur-2xl hover:z-10`}
            onClick={onClick}
        >
            {/* Image Section */}
            <div className="relative w-full h-[calc(100%-5rem)]">
                {isNew && (
                    <span className="badge badge-info absolute top-0 right-0 z-10">
                        NEW
                    </span>
                )}
                <img
                    src={image}
                    alt={title}
                    className="object-cover w-full h-full"
                />
            </div>

            {/* Text Section */}
            <div className="card-body flex flex-row w-full h-fit p-0">
                <div className="flex flex-col gap-0 w-auto max-w-2/3">
                    <h2 className="card-title text-lg font-bold leading-tight m-0">
                        {title}
                    </h2>
                    {description && <p className="text-sm">{description}</p>}
                </div>
                <div className="flex flex-col gap-2 justify-center align-center ml-auto">
                    {date && <span className="badge badge-primary w-fit whitespace-nowrap">{date}</span>}
                </div>
            </div>
        </div>
    );
};

export default Card;
