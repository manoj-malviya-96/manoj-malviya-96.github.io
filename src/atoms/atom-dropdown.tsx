import React, {useState} from 'react';
import {Dropdown, DropdownChangeEvent} from 'primereact/dropdown';
import {FloatLabel} from "primereact/floatlabel";


interface DropdownItemProps {
    label: string;
    icon?: string;
}

interface DropdownProps {
    onClick: (option: DropdownItemProps) => void;
    options: Array<DropdownItemProps>;
    placeholder?: string;
    initialIndex?: number;
    className?: string;
}

const AtomDropdown: React.FC<DropdownProps> = ({
                                                   onClick,
                                                   options,
                                                   placeholder = 'Select',
                                                   initialIndex = -1,
                                               }) => {

    const [activeIndex, setActiveIndex] = useState(initialIndex);
    const randomId = crypto.randomUUID().toString();

    const handleOptionClick = (value: DropdownItemProps) => {
        const index = options.findIndex(option => option === value);
        setActiveIndex(index);
        onClick(value); // Pass selected option to parent
    }

    return (
        <FloatLabel>
            <Dropdown
                inputId={randomId}
                value={options[activeIndex]}
                onChange={(e: DropdownChangeEvent) => handleOptionClick(e.value)}
                options={options}
                optionLabel="name" className="w-full"/>
            <label htmlFor={randomId}>{placeholder}</label>
        </FloatLabel>
    );
};
export default AtomDropdown;
