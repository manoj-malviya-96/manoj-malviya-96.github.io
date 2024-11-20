import React from 'react';
import Card from './card'; // Import the existing Card component

const BentoBox = ({ blogs, maxWidth = '192px' }) => {
    return (
        <div className="flex gap-4">
            {[
                [24, 32, 32, 16, 16],
                [32, 40, 56],
                [64, 32, 32],
            ].map((card, index) => (
                <div className="flex-1" key={index}>
                    {card.map((height, index) => (
                        <div
                            className={`mb-4 h-${height} rounded-xl border-2 border-slate-400/10 bg-neutral-100 p-4 dark:bg-neutral-900`}
                            key={index}
                        ></div>
                    ))}
                </div>
            ))}
        </div>
    );
};

export default BentoBox;
