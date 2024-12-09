import React, {useState} from 'react';
import {Dropdown, DropdownChangeEvent} from 'primereact/dropdown';
import {useTheme} from "../main/theme";
import {adjustColor} from "../common/color-utils";



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

    const [value, selectedValue] = useState<any>(initialIndex !== -1 ? options[initialIndex] : null);
    const randomId = crypto.randomUUID();
    const {daisyPrimary, daisyPrimaryText, daisyNeutral} = useTheme();

    const handleOptionClick = (value: any) => {
        selectedValue(value);
        onClick(value); // Pass selected option to parent
    };
    const mainColor = neutralMode ? daisyNeutral : daisyPrimary;
    const mainTextColor = neutralMode ? daisyNeutral : daisyPrimaryText;
    const borderColor = adjustColor(mainColor, 0.5);

    const dropdownPt = {
        root: {
            style: {
                backgroundColor: 'transparent',
                borderColor: borderColor,
                color: mainTextColor,
            }
        },
        input: {
            style: {
                display: 'hidden',
            }
        },
        panel: {
            style: {
                backgroundColor: 'transparent',
                borderColor: borderColor,
                color: mainTextColor,
                backdropFilter: 'blur(20px)',
            }
        },
        trigger: {
            style: {
                backgroundColor: 'transparent',
                borderColor: 'transparent',
                color: mainTextColor,
            }
        },
        wrapper: {
            style: {
                backgroundColor: 'transparent',
                borderColor:borderColor,
                color: mainTextColor,
                selectedColor: mainTextColor,
            }
        },
    }

    return (
        <div className={`flex justify-content-center ${className}`}>
            <Dropdown
                inputId={randomId}
                value={value}
                onChange={(e: DropdownChangeEvent) => handleOptionClick(e.value)}
                options={options}
                dropdownIcon={dropdownIcon ? dropdownIcon : 'pi pi-chevron-down'}
                collapseIcon="pi pi-chevron-up"
                variant={'outlined'}
                placeholder={placeholder}
                className="w-fit"
                pt={dropdownPt}
            />
        </div>
    );
};

const AtomDropdown = React.memo(_AtomDropdown);
export default AtomDropdown;
