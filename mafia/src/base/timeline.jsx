import React from 'react';
import Card from './card'; // Assuming you have a Card component
import '@fortawesome/fontawesome-free/css/all.min.css'; // For Font Awesome
import 'bootstrap-icons/font/bootstrap-icons.css'; // For Bootstrap Icons

const Timeline = ({ items }) => {
    return (
        <ul className="timeline timeline-vertical">
            {items.map((item, index) => {
                const forDate = index % 2 ? 'timeline-end' : 'timeline-start';
                const forContent = index % 2 ? 'timeline-start' : 'timeline-end';

                return (<li key={item.id || index}>
                    {/* Line Connector */}
                    {index > 0 && (
                        <hr className="timeline-middle text-accent"/>
                    )}

                    {/* Icon */}
                    <div className="timeline-middle">
                        <i
                            className={`${item.icon} text-3xl text-primary`}
                            aria-hidden="true"
                        ></i>
                    </div>

                    {/* Content */}
                    <div className={`${forContent} mb-2 mr-2 md:mt-2`}>
                        <Card
                            image={item.image}
                            title={item.title}
                            date={item.date}
                            onClick={() => window.location.assign(item.link)}
                        />
                    </div>

                    <span className={forDate}>{item.date}</span>

                    {/* Line Connector */}
                    {index < items.length - 1 && (
                        <hr className="timeline-middle text-accent"/>
                    )}

                </li>
                );
            })}
        </ul>
    );
};

export default Timeline;
