import React from 'react';

const PrimaryButton = ({ icon, label, onClick }) => {
    return (
        <button className="btn btn-primary flex items-center gap-2" onClick={onClick}>
            {icon && <span className="icon">{icon}</span>}
            {label}
        </button>
    );
};

export default PrimaryButton;
