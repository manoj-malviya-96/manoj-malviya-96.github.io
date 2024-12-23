import React, {useState} from "react";

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
    
    const rotation = (
        (
            value - min
        ) / (
            max - min
        )
    ) * 270 - 135;
    
    return (
        <div className="flex flex-col items-center w-fit h-fit p-4">
            {label && <span className="text-sm mb-2">{label}</span>}
            
            <div className="relative w-24 h-24">
                
                <div className="absolute inset-0 flex justify-center items-center
                                rounded-full bg-primary border-secondary">
                    <div
                        className="absolute inset-0 rounded-full border-8
                                    border-secondary border-t-primary-content"
                        style={{
                            transform: `rotate(${rotation}deg)`
                        }}
                    >
                    </div>
                    <span className={"text-3xl font-bold"}>{value}</span>
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
        </div>
    );
};

const AtomKnob = React.memo(_AtomKnob);
export default AtomKnob;
