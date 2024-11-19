import React from 'react';
import Card from './card';
import '@fortawesome/fontawesome-free/css/all.min.css'; // For Font Awesome
import 'bootstrap-icons/font/bootstrap-icons.css'; // For Bootstrap Icons
const Timeline = ({ items }) => {
    return (
        <ul className="timeline timeline-snap-icon max-md:timeline-compact timeline-vertical">
            {items.map((item, index) => {
                const isFirst = index === 0;
                const isAlternate = index % 2 === 0;
                const cardClass = isAlternate ? 'timeline-start' : 'timeline-end';
                const textClass = isFirst ? 'text-success' : 'text-gray-500';

                return (
                    <li key={item.id || index} className="timeline-item">
                        {/* Icon */}
                        <div className={`timeline-middle ${textClass}`}>
                            <i className={`${item.icon} text-lg`} aria-hidden="true"></i>
                        </div>
                        {/* Card */}
                        <div className={`${cardClass} ${textClass} m-6`}>
                            <Card
                                image={item.image}
                                title={item.title}
                                date={item.date}
                                onClick={() => window.location.assign(item.link)}
                            />
                        </div>

                        {/* Horizontal Line */}
                        {!(index === items.length - 1) && (
                            <hr className="h-full border-gray-300 my-2" />
                        )}
                    </li>
                );
            })}
        </ul>
    );
};

export default Timeline;
