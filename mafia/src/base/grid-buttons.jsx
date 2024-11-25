import React from 'react';
import PrimaryButton from './primary-button';
import {validateStructTypeForList} from "../utils/types";
import {ButtonOptions} from "../utils/enums";

const GridButtons = ({items, className}) => {
    console.log(items);
    validateStructTypeForList(items, 'GridButtonItem');

    return (
        <div className="w-full h-fit grid grid-cols-3 sm:grid-cols-4 md:grid-cols-8 gap-0 p-0">
            {items.map((item, index) => (
                <PrimaryButton
                    key={index}
                    label={item.label}
                    icon={item.icon}
                    onClick={item.onClickFunc}
                    size={item.size}
                    state={item.state}
                    style={item.style}
                    className={className}
                />
            ))}
        </div>
    );
};

export default GridButtons;
