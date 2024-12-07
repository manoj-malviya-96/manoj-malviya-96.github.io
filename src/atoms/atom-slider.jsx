import React from "react";
import {Slider} from "primereact/slider";

const AtomSlider = ({value, min, max, step = 1, orientation, onChange, className}) => {
    return (
        <div className={`card flex justify-center ${className}`}>
            <Slider className={`bg-transparent w-full h-fit`}
                    value={value} min={min} max={max} step={step} orientation={orientation}
                    onChange={(event => onChange(event.value))}
            />
        </div>
    );
};


export default AtomSlider;
