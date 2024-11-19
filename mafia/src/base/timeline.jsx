import React from 'react';
import Card from './card'; // Assuming you have a Card component
import '@fortawesome/fontawesome-free/css/all.min.css'; // For Font Awesome
import 'bootstrap-icons/font/bootstrap-icons.css'; // For Bootstrap Icons

const Timeline = ({ items }) => {
    return (
        <ul className="timeline timeline-vertical md:timeline-horizontal">
            {items.map((item, index) => (
                <li key={item.id || index}>
                    {/* Line Connector */}
                    {index > 0 && (
                        <hr className="timeline-middle"/>
                    )}

                    {/* Icon */}
                    <div className="timeline-middle">
                        <i
                            className={`${item.icon} text-3xl`}
                            aria-hidden="true"
                        ></i>
                    </div>

                    {/* Content */}
                    <div className="timeline-start mb-8 mr-8 md:mt-8">
                        <Card
                            image={item.image}
                            title={item.title}
                            date={item.date}
                            onClick={() => window.location.assign(item.link)}
                        />
                    </div>

                    <span className="timeline-end">{item.date}</span>

                    {/* Line Connector */}
                    {index < items.length - 1 && (
                        <hr className="timeline-middle"/>
                    )}

                </li>
            ))}
        </ul>
    );
};

export default Timeline;
