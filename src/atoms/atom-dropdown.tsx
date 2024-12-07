import React, {useState} from 'react';
import {Dropdown, DropdownChangeEvent} from 'primereact/dropdown';


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
                className="w-full bg-transparent border-primary hover:border-primary"
                style={{
                    backgroundColor: 'transparent',
                }}
            />
        </div>
    );
};
export default AtomDropdown;
