import React from "react";
import {Slider} from "primereact/slider";
import {useTheme} from "../main/theme";


interface AtomSliderProps {
    value: number;
    min: number;
    max: number;
    step?: number;
    orientation?: "horizontal" | "vertical";
    onChange: (value: number) => void;
    className?: string;
    neutralMode?: boolean;
}

const _AtomSlider: React.FC<AtomSliderProps> = ({
                                                    value,
                                                    min,
                                                    max,
                                                    step = 1,
                                                    orientation = 'horizontal',
                                                    onChange,
                                                    className,
                                                    neutralMode = false
                                                }) => {
    const {daisyPrimary, daisyPrimaryText, daisyNeutral, daisyNeutralText} = useTheme();
    const sliderPt = {
        root: {
            style: {
                height: '2px',
                width: '100%',
                backgroundColor: neutralMode ? daisyNeutral : daisyPrimary,
            }
        },
        handle: {
            style: {
                width: '10px',
                height: '30px',
                backgroundColor: neutralMode ? daisyNeutral : daisyPrimary,
                border: 'none',
                borderRadius: '2px',
                boxShadow: 'none',
                cursor: 'pointer',
                marginTop: '-14px', //Hacky to center the handle
            }
        },
        range: {
            style: {
                backgroundColor: neutralMode ? daisyNeutralText : daisyPrimaryText,
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

const AtomSlider = React.memo(_AtomSlider);
export default AtomSlider;
