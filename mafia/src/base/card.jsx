import React from 'react';
import {motion} from 'motion/react'

const Card = ({image, title, date, description, onClick}) => {
    return (<motion.div
        className="card shadow-md h-full w-full z-0 hover:z-10
                        rounded-lg cursor-pointer overflow-hidden sm:card-compact"
        initial={{transform: 'translateY(50%)', scale: 1.0}}
        whileInView={{ transform: 'translateY(0)', scale: 1.0}}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={onClick}
    >
        {/* Background Image */}
        <div
            className="w-full h-full border-none"
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
    </motion.div>);
};

export default Card;
