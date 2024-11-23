import React from 'react';
import 'bootstrap-icons/font/bootstrap-icons.css';
import '@fortawesome/fontawesome-free/css/all.min.css';

const PrimaryButton = ({
                           icon,
                           label,
                           onClick,
                           isLarge = false,
                           isLoading = false,
                           className = '',
                       }) => {
    const sizeClass = isLarge ? 'btn-lg' : 'btn-sm';

    return (
        <button
            className={`btn btn-primary ${sizeClass} items-center gap-2 rounded-full px-4 py-1 ${className}`}
            onClick={onClick}
            disabled={isLoading} // Disable while loading
            aria-label={label || 'Button'}
        >
            {/* Loading Spinner */}
            {isLoading && <span className="loading loading-spinner"></span>}

            {/* Icon */}
            {icon && !isLoading && <i className={icon}></i>}

            {/* Label */}
            {label && !isLoading && (
                <span className={icon ? 'hidden sm:inline' : ''}>{label}</span>
            )}
        </button>
    );
};

export default PrimaryButton;
