import React from 'react';
import 'bootstrap-icons/font/bootstrap-icons.css';
import '@fortawesome/fontawesome-free/css/all.min.css';


const PrimaryButton = ({ icon, label, onClick }) => {
    return (
        <button
            className="btn btn-primary flex items-center gap-1 rounded-full px-4 py-1"
            onClick={onClick}
        >
            {icon && <i className={icon}></i>}
            {label && <span>{label}</span>}
        </button>
    );
};

export default PrimaryButton;
