import React from "react";
import { useTheme } from "../providers/theme";
import { adjustColor } from "../common/color-utils";
import { AtomColumn, LayoutGap, LayoutSize, AtomRow } from "./atom-layout";
import { AtomPrimaryText, AtomSecondaryText } from "./atom-text";

export enum SliderOrientation {
  Horizontal,
  Vertical,
}

export interface AtomSliderProps {
  value: number;
  min: number;
  max: number;
  step?: number;
  orientation?: SliderOrientation;
  onChange: (value: number) => void;
  className?: string;
  disabled?: boolean;
  size?: "small" | "normal";
  label?: string;
}

const AtomSlider: React.FC<AtomSliderProps> = React.memo(
  ({
    value,
    min,
    max,
    step = 1,
    disabled = false,
    orientation = SliderOrientation.Horizontal,
    onChange,
    className,
    label,
    size = "normal",
  }) => {
    const magicSize = size === "small" ? 5 : 8;
    const { daisySecondary } = useTheme();

    let progressPercentage = 0;
    if (value) {
      progressPercentage = ((value - min) / (max - min)) * 100;
    }

    const mainColor = daisySecondary;
    const backgroundColor = adjustColor(mainColor, 0.27);

    return (
      <AtomColumn className={className} gap={LayoutGap.Small}>
        {label && (
          <AtomRow
            size={LayoutSize.None}
            className={"w-full h-fit justify-between"}
          >
            <AtomPrimaryText>{label}</AtomPrimaryText>
            <AtomSecondaryText>{value}</AtomSecondaryText>
          </AtomRow>
        )}
        <input
          type="range"
          className={`w-full`}
          value={value}
          min={min}
          max={max}
          step={step}
          disabled={disabled}
          onChange={(event) => onChange(Number(event.target.value))}
          style={{
            appearance: "none",
            width: "100%",
            height: `${magicSize}px`,
            outline: "none",
            cursor: "pointer",
            background: `linear-gradient(to right,
                                    ${disabled ? backgroundColor : mainColor} ${progressPercentage}%,
                                    ${backgroundColor} ${progressPercentage}%)`,
            borderRadius: `${magicSize / 2}px`,
          }}
        />
        <style>{`
                input[type='range']::-webkit-slider-thumb {
                    -webkit-appearance: none;
                    appearance: none;
                    background-color: ${disabled ? backgroundColor : mainColor};
                    width: ${magicSize}px;
                    border-radius: ${magicSize / 2}px;
                    height: ${4 * magicSize}px;
                    cursor: pointer;
                }
            `}</style>
      </AtomColumn>
    );
  },
);

export default AtomSlider;
