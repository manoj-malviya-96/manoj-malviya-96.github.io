import React, { useState } from "react";
import { AtomTitleText } from "./atom-text";
import { AtomColumn, LayoutGap } from "./atom-layout";

interface AtomKnobProps {
  step?: number;
  min?: number;
  max?: number;
  disabled?: boolean;
  readOnly?: boolean;
  label?: string;
  onChange?: (e: number) => void;
  initValue?: number;
}

const AtomKnob: React.FC<AtomKnobProps> = React.memo(
  ({
    label,
    step = 1,
    min = 0,
    max = 100,
    disabled = false,
    readOnly = false,
    onChange,
    initValue = 50,
  }) => {
    const [value, setValue] = useState<number>(initValue);

    const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = parseFloat(e.target.value);
      setValue(newValue);
      if (onChange) {
        onChange(newValue);
      }
    };

    const rotation = ((value - min) / (max - min)) * 270 - 135;

    return (
      <AtomColumn className="p-4 mx-auto" gap={LayoutGap.None}>
        {label && <span className="text-sm mb-2">{label}</span>}
        <div className="relative w-20 h-20">
          <div
            className="absolute inset-0 flex justify-center items-center
                                rounded-full bg-primary border-neutral"
          >
            <div
              className="absolute inset-0 rounded-full border-8
                                    border-neutral border-t-primary-content"
              style={{
                transform: `rotate(${rotation}deg)`,
              }}
            ></div>
            <AtomTitleText>{value.toString()}</AtomTitleText>
          </div>

          <input
            type="range"
            className="absolute inset-0 opacity-0 cursor-pointer"
            min={min}
            max={max}
            step={step}
            value={value}
            onChange={handleOnChange}
            disabled={disabled || readOnly}
          />
        </div>
      </AtomColumn>
    );
  },
);
export default AtomKnob;
