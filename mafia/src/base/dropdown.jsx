import React, {useState} from 'react';
import {DropdownOptions} from '../utils/enums';
import {validateStructTypeForList} from "../utils/types";

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

    const handleOptionClick = (option, index) => {
        setActiveIndex(index);
        onClick(option); // Pass selected option to parent
    };

    return (
        <div className={`dropdown ${direction} ${behavior}`}>
            <div tabIndex={0} role="button"
                 className={`btn m-1 ${buttonStyle} ${buttonSize} rounded-full`}>
                {options[activeIndex].icon && (<i className={options[activeIndex].icon}/>)}
                {options[activeIndex].label && (<span>{options[activeIndex].label}</span>)}
            </div>
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
        </div>
    );
};

export default Dropdown;
