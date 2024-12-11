import React, {useContext, useState} from 'react';
import {Dropdown, DropdownChangeEvent} from 'primereact/dropdown';
import {useTheme} from "../common/theme";
import {adjustColor} from "../common/color-utils";
import {ScreenSizeContext, ScreenSizes} from '../common/screen';


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
    
    const [value, selectedValue] = useState<any>(initialIndex !== -1 ? options[initialIndex].value : null);
    const breakpoint = useContext(ScreenSizeContext);
    const randomId = crypto.randomUUID();
    const {
        daisyPrimary,
        daisyPrimaryText,
        daisyNeutral
    } = useTheme();
    
    const handleOptionClick = (value: any) => {
        selectedValue(value);
        onClick(value); // Pass selected option to parent
    };
    const mainColor = neutralMode ? daisyNeutral : daisyPrimary;
    const mainTextColor = neutralMode ? daisyNeutral : daisyPrimaryText;
    const borderColor = neutralMode ? adjustColor(mainColor, 0.4) : mainColor;
    
    const dropdownPt = {
        root: {
            style: {
                backgroundColor: 'transparent',
                borderColor: borderColor,
                color: mainTextColor,
                width: 'content-fit',
                height: 'content-fit',
                padding: breakpoint !== ScreenSizes.Small ? 0 : 8,
            }
        },
        input: {
            style: {
                backgroundColor: 'transparent',
                color: mainTextColor,
                display: breakpoint !== ScreenSizes.Small ? 'flex' : 'none',
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
                borderColor: borderColor,
                color: mainTextColor,
                selectedColor: mainTextColor,
            }
        },
        item: {
            style: {
                backgroundColor: 'transparent',
                borderColor: borderColor,
                color: mainTextColor,
                selectedColor: mainTextColor,
            }
        },
    }
    
    return (
        <div
            className={`flex flex-col gap-0 ${className}`}>
            <Dropdown
                inputId={randomId}
                value={value}
                onChange={(e: DropdownChangeEvent) => handleOptionClick(e.value)}
                options={options}
                dropdownIcon={dropdownIcon ? dropdownIcon : 'pi pi-chevron-down'}
                collapseIcon="pi pi-chevron-up"
                optionLabel={'label'}
                optionValue={'value'}
                variant={'outlined'}
                checkmark={true}
                placeholder={placeholder}
                pt={dropdownPt}
                tooltip={placeholder}
                tooltipOptions={{
                    showDelay: 690,
                    hideDelay: 0,
                    position: 'top',
                    mouseTrack: true,
                    mouseTrackTop: 15,
                }}
            />
        </div>
    );
};

const AtomDropdown = React.memo(_AtomDropdown);
export default AtomDropdown;
