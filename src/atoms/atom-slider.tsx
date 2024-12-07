import React from "react";
import {Slider} from "primereact/slider";


interface AtomSliderProps {
    value: number;
    min: number;
    max: number;
    step?: number;
    orientation?: "horizontal" | "vertical";
    onChange: (value: number) => void;
    className?: string;
}

const AtomSlider: React.FC<AtomSliderProps> = ({
                                                   value,
                                                   min,
                                                   max,
                                                   step = 1,
                                                   orientation = 'horizontal',
                                                   onChange,
                                                   className
                                               }) => {
    return (
        <div className={`card flex justify-center ${className}`}>
            <Slider className={`bg-transparent w-full h-fit`}
                    value={value} min={min} max={max} step={step} orientation={orientation}
                    onChange={(event => onChange(event.value as number))}
            />
        </div>
    );
};


export default AtomSlider;
