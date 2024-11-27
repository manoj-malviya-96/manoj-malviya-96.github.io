import React, {useState} from 'react';
import {DropdownOptions} from '../utils/enums';

const Dropdown = ({
                      onClick,
                      options,
                      behavior = DropdownOptions.Behavior.Default,
                      direction = DropdownOptions.Direction.Down,
                      buttonStyle = DropdownOptions.Style.Primary,
                      buttonSize = DropdownOptions.Size.Medium,
                  }) => {
    const [activeOption, setActiveOption] = useState(null);
    if (!activeOption) {
        setActiveOption(options[0]);
    }

    const handleOptionClick = (option) => {
        setActiveOption(option);
        onClick(option); // Pass selected option to parent
    };

    return (
        <div className={`dropdown ${direction} ${behavior}`}>
            <div tabIndex={0} role="button"
                 className={`btn m-1 ${buttonStyle} ${buttonSize} rounded-full`}>
                {activeOption || 'Select Option'}
            </div>
            <ul
                tabIndex={0}
                className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow"
            >
                {options.map((option, index) => (
                    <li key={index}>
                        <a
                            className={activeOption === option ? 'active' : ''}
                            onClick={() => handleOptionClick(option)}
                        >
                            {option}
                        </a>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Dropdown;
