import React from "react";
import {Slider} from "primereact/slider";
import {daisyPrimary, daisyPrimaryText} from "../common/color-utils";


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
    const sliderPt = {
        root: {
            style: {
                height: '2px',
                width: '100%',
                backgroundColor: daisyPrimary(),
            }
        },
        handle: {
            style: {
                width: '10px',
                height: '30px',
                backgroundColor: daisyPrimary(),
                border: 'none',
                borderRadius: '2px',
                boxShadow: 'none',
                cursor: 'pointer',
                marginTop: '-14px', //Hacky to center the handle
            }
        },
        range: {
            style: {
                backgroundColor: daisyPrimaryText(),
            }
        }
    }


    return (
        <div className={`card flex justify-center w-full ${className}`}>
            <Slider pt={sliderPt}
                    value={value} min={min} max={max} step={step} orientation={orientation}
                    onChange={(event => onChange(event.value as number))}
            />
        </div>
    );
};


export default AtomSlider;
