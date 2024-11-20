import React from 'react';
import 'bootstrap-icons/font/bootstrap-icons.css';
import '@fortawesome/fontawesome-free/css/all.min.css';

const PrimaryButton = ({icon, label, onClick, isLarge = false}) => {
    const sizeClass = isLarge ? 'btn-lg' : 'btn-sm';
    return (
        <button
            className={`btn btn-primary ${sizeClass} items-center gap-2 rounded-full px-4 py-1`}
            onClick={onClick}
        >
            {/* Icon */}
            {icon && <i className={icon}></i>}

            {/* Label with conditional visibility */}
            {label && (
                <span className={icon ? 'hidden sm:inline' : ''}>
                    {label}
                </span>
            )}
        </button>
    );
};

export default PrimaryButton;
