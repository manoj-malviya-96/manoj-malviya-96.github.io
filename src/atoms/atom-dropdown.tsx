import React, { ReactNode, useState } from "react";
import { AtomButton, ButtonSeverity, ButtonType } from "./atom-button";

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
  disabled?: boolean;
}

const AtomDropdown: React.FC<AtomDropdownProps> = React.memo(
  ({
    onClick,
    options,
    dropdownIcon,
    header,
    disabled = false,
    placeholder = "Select",
    initialIndex = -1,
    className = "",
  }) => {
    const [selectedOption, setSelectedOption] =
      useState<AtomDropdownItemProps | null>(
        initialIndex !== -1 ? options[initialIndex] : null,
      );
    const [open, setOpen] = useState(false);

    const iconWhenDropdownIsClosed = dropdownIcon
      ? dropdownIcon
      : "fa fa-chevron-up";
    const iconWhenDropdownIsOpen = "fa fa-chevron-down";

    const handleOptionClick = (option: AtomDropdownItemProps) => {
      setSelectedOption(option);
      onClick(option.value); // Pass selected option to parent
      setOpen(false);
    };

    return (
      <div className={`dropdown dropdown-top ${className}`}>
        {/*Button*/}
        <AtomButton
          disabled={disabled}
          icon={open ? iconWhenDropdownIsOpen : iconWhenDropdownIsClosed}
          label={selectedOption ? selectedOption.label : placeholder}
          onClick={() => setOpen(!open)}
          className={`w-full`}
          pill={false}
          hoverEffect={false}
          severity={open ? ButtonSeverity.Secondary : ButtonSeverity.Primary}
          type={open ? ButtonType.Solid : ButtonType.Outlined}
        />

        {/*DropDown Content*/}
        <ul
          tabIndex={0}
          className={`dropdown-content menu p-2 shadow w-full mb-3
                            border border-neutral border-opacity-50 rounded-lg bg-primary
                            ${open ? "block" : "hidden"}`}
        >
          {options.map((option, index) => (
            <li key={index}>
              <div
                className={`w-full rounded-none
                            ${
                              !!selectedOption && selectedOption === option
                                ? "bg-secondary text-secondary-content"
                                : ""
                            }`}
                onClick={() => handleOptionClick(option)}
              >
                {option.label}
              </div>
            </li>
          ))}
          {header && <li className={"border-neutral border-t"}>{header}</li>}
        </ul>
      </div>
    );
  },
);
export default AtomDropdown;
