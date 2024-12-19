import React from "react";
import {useTheme} from "../common/theme";
import {adjustColor} from "../common/color-utils";

export enum SliderOrientation {
    Horizontal,
    Vertical
}

export interface AtomSliderProps {
    value: number;
    min: number;
    max: number;
    step?: number;
    orientation?: SliderOrientation;
    onChange: (value: number) => void;
    className?: string;
    neutralMode?: boolean;
    size?: "small" | "normal";
    label?: string;
}

const _AtomSlider: React.FC<AtomSliderProps> = ({
                                                    value,
                                                    min,
                                                    max,
                                                    step = 1,
                                                    orientation = SliderOrientation.Horizontal,
                                                    onChange,
                                                    className,
                                                    label,
                                                    size = "normal",
                                                    neutralMode = false,
                                                }) => {
    const height = size === "small" ? 3 : 5;
    const {daisyPrimary, daisyNeutral} = useTheme();
    
    let progressPercentage = 0;
    if (value) {
        progressPercentage = ((value - min) / (max - min)) * 100;
    }
    
    const mainColor = neutralMode ? daisyNeutral : daisyPrimary;
    const backgroundColor = adjustColor(mainColor, 0.2);
    
    return (
        <div className={`flex flex-col ${className}`}>
            {label && (
                <div className="flex flex-row justify-between mb-2">
                    <span>{label}</span>
                    <span>{value}</span>
                </div>
            )}
            <input
                type="range"
                className={`w-full`}
                value={value}
                min={min}
                max={max}
                step={step}
                onChange={(event) =>
                            onChange(Number(event.target.value))}
                style={{
                    appearance: "none",
                    width: "100%",
                    height: `${height}px`,
                    outline: "none",
                    cursor: "pointer",
                    background: `linear-gradient(to right,
                                    ${mainColor} ${progressPercentage}%,
                                    ${backgroundColor} ${progressPercentage}%)`,
                    borderRadius: "5px",
                }}
            />
            <style>{`
                input[type='range']::-webkit-slider-thumb {
                    -webkit-appearance: none;
                    appearance: none;
                    background-color: ${mainColor};
                    width: ${height}px;
                    border-radius: 2px;
                    height: ${4 * height}px;
                    cursor: pointer;
                }
            `}</style>
        </div>
    );
};

const AtomSlider = React.memo(_AtomSlider);
export default AtomSlider;
