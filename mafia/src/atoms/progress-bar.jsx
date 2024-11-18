import React from "react";


const ProgressBar = ({value, max, className}) => {
    return (
        <progress className={`progress progress-primary w-56 ${className}`} value={value} max={max}></progress>
    );
}

export default ProgressBar;