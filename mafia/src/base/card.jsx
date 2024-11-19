import React from 'react';

const Card = ({ image, title, date, onClick }) => {
    return (
        <div
            className="card bg-base-100 shadow-md border-2 border-primary rounded-lg hover:shadow-xl transition-all duration-300 cursor-pointer flex flex-col md:flex-row"
            onClick={onClick}
        >
            <figure className="rounded-t-lg md:rounded-l-lg md:rounded-tr-none">
                <img src={image} alt={title} className="w-full h-48 object-cover" />
            </figure>
            <div className="card-body">
                <h2 className="card-title">{title}</h2>
                <p>{date}</p>
            </div>
        </div>
    );
};

export default Card;


