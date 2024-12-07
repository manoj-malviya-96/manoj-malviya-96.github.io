import React from 'react';
import AtomCard from './atom-card'; // Assuming you have a Card component

const Timeline = ({items}) => {
    return (
        <ul className="timeline timeline-vertical">
            {items.map((item, index) => {

                const forContent = index % 2 ? 'timeline-start' : 'timeline-end';
                const isPresent = item.date === "Present";

                return (
                    <li key={item.id || index} className="w-full h-fit relative">
                        {/* Line Connector (below) */}
                        {index > 0 && (
                            <hr className="bg-secondary bg-opacity-50"/>
                        )}
                        <div className="timeline-middle">
                            {/* Icon */}
                            <i
                                className={`${item.icon} text-1xl ${isPresent ? 'text-success' : ''} 
                                            bg-primary p-2 rounded-full`}
                                aria-hidden="true"
                            ></i>
                        </div>

                        {/* Content */}
                        <div className={`${forContent} w-4/5 h-48`}>
                            <AtomCard
                                image={item.image}
                                title={item.title}
                                hasBorder={isPresent}
                                onClick={() => window.location.assign(item.link)}
                            />
                        </div>

                        {/* Line Connector (below) */}
                        {index < items.length - 1 && (
                            <hr className="bg-secondary bg-opacity-50"/>
                        )}

                    </li>
                );
            })}
        </ul>
    );
};

export default Timeline;
