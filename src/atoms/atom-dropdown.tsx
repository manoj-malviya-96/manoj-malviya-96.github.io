import React, {useState} from 'react';
import {Dropdown, DropdownChangeEvent} from 'primereact/dropdown';
import {FloatLabel} from "primereact/floatlabel";


export interface AtomDropdownItemProps {
    label: string;
    value: any;
}

interface AtomDropdownProps {
    onClick: (option: AtomDropdownItemProps) => void;
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
                                                   }) => {

    const [activeIndex, setActiveIndex] = useState(initialIndex);
    const randomId = crypto.randomUUID().toString();

    const handleOptionClick = (selectedOption: AtomDropdownItemProps) => {
        const index = options.findIndex(option => option === selectedOption);
        setActiveIndex(index);
        onClick(selectedOption.value); // Pass selected option to parent
    }

    return (
        <FloatLabel>
            <Dropdown
                inputId={randomId}
                value={options[activeIndex].label}
                onChange={(e: DropdownChangeEvent) => handleOptionClick(e.value)}
                options={options}
                dropdownIcon={dropdownIcon ? dropdownIcon : 'pi pi-chevron-down'}
                collapseIcon="pi pi-chevron-up"
                optionLabel="name" className="w-full"/>
            <label htmlFor={randomId}>{placeholder}</label>
        </FloatLabel>
    );
};
export default AtomDropdown;
