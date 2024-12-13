import {Knob, KnobChangeEvent} from 'primereact/knob';
import React, {useState} from "react";
import {useTheme} from "../common/theme";

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

const _AtomKnob: React.FC<AtomKnobProps> = ({
                                                label,
                                                step,
                                                min,
                                                max,
                                                disabled = false,
                                                readOnly = false,
                                                onChange,
                                                initValue = 10.0,
                                            }) => {
    
    const {
        daisyPrimary,
        daisyPrimaryText,
    } = useTheme();
    const [value, setValue] = useState<number>(initValue);
    
    const handleOnChange = (e: KnobChangeEvent) => {
        setValue(e.value);
        if (onChange) {
            onChange(e.value);
        }
    }
    
    return (
        <div
            className="card flex justify-center items-center p-2 w-fit h-full cursor-pointer">
            {label && <span
                className='m-auto text-sm'>{label}</span>}
            <Knob
                value={value}
                min={min}
                max={max}
                step={step}
                readOnly={readOnly}
                pt={{
                    range: {
                        style: {
                            stroke: daisyPrimary,
                        }
                    },
                    value: {
                        style: {
                            stroke: daisyPrimaryText,
                        }
                    }
                }}
                textColor={daisyPrimaryText}
                onChange={handleOnChange}
            />
        </div>
    );
}

const AtomKnob = React.memo(_AtomKnob);
export default AtomKnob;