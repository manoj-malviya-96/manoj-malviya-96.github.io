import React, {ReactNode, useState} from 'react';
import {AtomButton, ButtonType} from "./atom-button";

export interface AtomDropdownItemProps {
    label: string;
    value: any;
}

interface AtomDropdownProps {
    onClick: (option: any) => void;
    dropdownIcon?: string;
    options: Array<AtomDropdownItemProps>;
    header?: ReactNode;
    placeholder?: string;
    initialIndex?: number;
    className?: string;
}

const _AtomDropdown: React.FC<AtomDropdownProps> = ({
                                                        onClick,
                                                        options,
                                                        dropdownIcon,
                                                        header,
                                                        placeholder = 'Select',
                                                        initialIndex = -1,
                                                        className = '',
                                                    }) => {
    
    const [selectedOption, setSelectedOption] = useState<AtomDropdownItemProps | null>(
        initialIndex !== -1 ? options[initialIndex] : null);
    const [open, setOpen] = useState(false);
    
    const iconWhenDropdownIsClosed = dropdownIcon ? dropdownIcon : 'fa fa-chevron-up';
    const iconWhenDropdownIsOpen = 'fa fa-chevron-down';
    
    const handleOptionClick = (option: AtomDropdownItemProps) => {
        setSelectedOption(option);
        onClick(option.value); // Pass selected option to parent
        setOpen(false);
    };
    
    return (
        <div className={`dropdown dropdown-top ${className}`}>
            {/*Button*/}
            <AtomButton
                icon={open ? iconWhenDropdownIsOpen : iconWhenDropdownIsClosed}
                label={selectedOption ? selectedOption.label : placeholder}
                onClick={() => setOpen(!open)}
                className={`w-full`}
                pill={false}
                type={ButtonType.Outlined}
            />
            
            {/*DropDown Content*/}
            <ul
                tabIndex={0}
                className={`dropdown-content menu p-0 shadow w-full mb-3
                            border border-secondary
                            bg-transparent backdrop-blur-lg rounded-lg
                            ${open ? 'block' : 'hidden'}`}
            >
                {options.map((option, index) => (
                    <li key={index}>
                        <div
                            className={`rounded-lg w-full
                                        ${selectedOption === option ? 'active bg-secondary' : ''}`}
                            onClick={() => handleOptionClick(option)}
                        >
                            {option.label}
                        </div>
                    </li>
                ))}
                {header &&
                    <li className={'border-secondary border-t'}>
                        {header}
                    </li>
                }
            </ul>
        </div>
    );
};

const AtomDropdown = React.memo(_AtomDropdown);
export default AtomDropdown;