import React, {useState} from 'react';
import {Dropdown, DropdownChangeEvent} from 'primereact/dropdown';
import {daisyPrimary, daisyPrimaryText} from "../common/color-utils";


export interface AtomDropdownItemProps {
    label: string;
    value: any;
}

interface AtomDropdownProps {
    onClick: (option: any) => void;
    dropdownIcon?: string;
    options: Array<AtomDropdownItemProps>;
    placeholder?: string;
    initialIndex?: number;
    className?: string;
}

const AtomDropdown: React.FC<AtomDropdownProps> = ({
                                                       onClick,
                                                       options,
                                                       dropdownIcon,
                                                       placeholder = 'Select',
                                                       initialIndex = -1,
                                                       className = ''
                                                   }) => {

    const [value, selectedValue] = useState<any>(initialIndex !== -1 ? options[initialIndex] : null);
    const randomId = crypto.randomUUID();

    const handleOptionClick = (value: any) => {
        selectedValue(value);
        onClick(value); // Pass selected option to parent
    };

    const dropdownPt = {
        root: {
            style: {
                backgroundColor: 'transparent',
                borderColor: daisyPrimary(),
                color: 'white',
            }
        },
        panel: {
            style: {
                backgroundColor: 'transparent',
                borderColor: daisyPrimary(),
                color: daisyPrimaryText(),
                backdropFilter: 'blur(20px)',
            }
        },
        trigger: {
            style: {
                backgroundColor: 'transparent',
                borderColor: daisyPrimary(),
                color: daisyPrimaryText(),
            }
        },
        wrapper: {
            style: {
                backgroundColor: 'transparent',
                borderColor: daisyPrimary(),
                color: daisyPrimaryText(),
                selectedColor: daisyPrimaryText(),
            }
        },
    }

    return (
        <div className={`card flex justify-content-center ${className}`}>
            <Dropdown
                inputId={randomId}
                value={value}
                onChange={(e: DropdownChangeEvent) => handleOptionClick(e.value)}
                options={options}
                dropdownIcon={dropdownIcon ? dropdownIcon : 'pi pi-chevron-down'}
                collapseIcon="pi pi-chevron-up"
                optionLabel="label"
                variant={'outlined'}
                placeholder={placeholder}
                className="w-full"
                pt={dropdownPt}
            />
        </div>
    );
};
export default AtomDropdown;
