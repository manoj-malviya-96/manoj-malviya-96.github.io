import React, {useState} from 'react';

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
    neutralMode?: boolean;
}

const _AtomDropdown: React.FC<AtomDropdownProps> = ({
                                                        onClick,
                                                        options,
                                                        dropdownIcon,
                                                        placeholder = 'Select',
                                                        initialIndex = -1,
                                                        className = '',
                                                        neutralMode = false,
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
            <div
                tabIndex={0}
                onClick={() => setOpen(!open)}
                className={`btn w-full
                            ${neutralMode ? 'btn-ghost text-neutral' : 'btn-primary'}`}
            >
                {selectedOption ? selectedOption.label : placeholder}
                <i className={`ml-auto ${open ? iconWhenDropdownIsOpen :
                    iconWhenDropdownIsClosed}`}></i>
            </div>
            {/*DropDown Content*/}
            <ul
                tabIndex={0}
                className={`dropdown-content menu p-0 shadow w-full mb-3
                            ${neutralMode ? 'text-neutral' : 'text-primary-content'}
                            bg-transparent backdrop-blur-lg rounded-md
                            ${open ? 'block' : 'hidden'}`}
            >
                {options.map((option, index) => (
                    <li key={index}>
                        <div
                            className={`rounded-lg w-full
                                        ${selectedOption === option ? 'active' : ''}`}
                            onClick={() => handleOptionClick(option)}
                        >
                            {option.label}
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

const AtomDropdown = React.memo(_AtomDropdown);
export default AtomDropdown;