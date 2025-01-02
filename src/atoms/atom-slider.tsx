import React from "react";
import {useTheme} from "../providers/theme";
import {adjustColor} from "../common/color-utils";
import {AtomColumn} from "./atom-layout";

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

const AtomSlider: React.FC<AtomSliderProps> = React.memo(({
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
	const magicSize = size === "small" ? 3 : 5;
	const {daisyPrimary} = useTheme();
	
	let progressPercentage = 0;
	if (value) {
		progressPercentage = (
			(
				value - min
			) / (
				max - min
			)
		) * 100;
	}
	
	const mainColor = neutralMode ? 'rgba(200,200,200)' : daisyPrimary;
	const backgroundColor = adjustColor(mainColor, 0.27);
	
	return (
		<AtomColumn className={className}>
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
					height: `${magicSize}px`,
					outline: "none",
					cursor: "pointer",
					background: `linear-gradient(to right,
                                    ${mainColor} ${progressPercentage}%,
                                    ${backgroundColor} ${progressPercentage}%)`,
					borderRadius: `${magicSize / 2}px`,
				}}
			/>
			<style>{`
                input[type='range']::-webkit-slider-thumb {
                    -webkit-appearance: none;
                    appearance: none;
                    background-color: ${mainColor};
                    width: ${magicSize}px;
                    border-radius: ${magicSize / 2}px;
                    height: ${4 * magicSize}px;
                    cursor: pointer;
                }
            `}</style>
		</AtomColumn>
	);
});

export default AtomSlider;
