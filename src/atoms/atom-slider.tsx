import React from "react";
import {Slider} from "primereact/slider";
import {useTheme} from "../main/theme";
import {adjustColor} from "../common/color-utils";


interface AtomSliderProps {
    value: number;
    min: number;
    max: number;
    step?: number;
    orientation?: "horizontal" | "vertical";
    onChange: (value: number) => void;
    className?: string;
    neutralMode?: boolean;
    size?: 'small' | 'normal';
}

const _AtomSlider: React.FC<AtomSliderProps> = ({
                                                    value,
                                                    min,
                                                    max,
                                                    step = 1,
                                                    orientation = 'horizontal',
                                                    onChange,
                                                    className,
                                                    size = 'medium',
                                                    neutralMode = false
                                                }) => {
    const {daisyPrimary, daisyPrimaryText, daisyNeutral} = useTheme();
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
                height: size === 'small' ? '10px' : '30px',
                backgroundColor: neutralMode ? daisyNeutral : daisyPrimary,
                border: 'none',
                borderRadius: '2px',
                boxShadow: 'none',
                cursor: 'pointer',
                marginTop: size === 'small' ? '-4px' : '-14px',
            }
        },
        range: {
            style: {
                height: '3px',
                backgroundColor: neutralMode ? 'white' : daisyPrimaryText,
            }
        }
    }


    return (
        <div className={`card flex justify-center ${className}`}>
            <Slider pt={sliderPt}
                    value={value} min={min} max={max} step={step} orientation={orientation}
                    onChange={(event => onChange(event.value as number))}
            />
        </div>
    );
};

const AtomSlider = React.memo(_AtomSlider);
export default AtomSlider;
