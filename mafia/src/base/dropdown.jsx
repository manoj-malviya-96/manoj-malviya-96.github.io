import React, { useState } from 'react';
import { DropdownOptions } from '../utils/enums';
import { validateStructTypeForList } from "../utils/types";

const Dropdown = ({
                      onClick,
                      options,
                      behavior = DropdownOptions.Behavior.Default,
                      direction = DropdownOptions.Direction.Down,
                      buttonStyle = DropdownOptions.Style.Primary,
                      buttonSize = DropdownOptions.Size.Medium,
                  }) => {

    validateStructTypeForList(options, 'DropdownItem');
    const [activeIndex, setActiveIndex] = useState(0);
    const [isOpen, setIsOpen] = useState(false); // Manage dropdown open state

    const handleOptionClick = (option, index) => {
        setActiveIndex(index);
        onClick(option); // Pass selected option to parent
        setIsOpen(false); // Close dropdown after selection
    };

    const toggleDropdown = () => {
        setIsOpen(!isOpen); // Toggle dropdown visibility
    };

    return (
        <div className={`dropdown ${direction} ${behavior}`}>
            <div
                tabIndex={0}
                role="button"
                className={`btn m-1 ${buttonStyle} ${buttonSize} rounded-lg`}
                onClick={toggleDropdown} // Open/close on button click
            >
                {options[activeIndex].icon && (<i className={options[activeIndex].icon}/>)}
                {options[activeIndex].label && (<span>{options[activeIndex].label}</span>)}
                <i className={!isOpen ? `fa bi-arrow-down` : `fa bi-arrow-up`}/>
            </div>
            {isOpen && ( // Conditionally render dropdown content
                <ul
                    tabIndex={0}
                    className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow"
                >
                    {options.map((option, index) => (
                        <li key={index}>
                            <a
                                className={activeIndex === index ? 'active' : ''}
                                onClick={() => handleOptionClick(option, index)}
                            >
                                {option.label}
                            </a>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default Dropdown;
