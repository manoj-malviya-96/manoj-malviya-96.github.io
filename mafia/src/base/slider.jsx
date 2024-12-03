import React from "react";

const Slider = ({ labelString,value, min, max, step = 1, onChange, className}) => {
    return (
        <div className={`flex items-center gap-4 ${className}`}>
            <input
                type="range"
                className="range range-info range-xs flex-grow"
                min={min}
                max={max}
                step={step}
                value={value}
                onChange={(e) => onChange(parseFloat(e.target.value))}
            />
            {labelString && (<span className="text-sm">{labelString}</span>)}
        </div>
    );
};

export default Slider;
