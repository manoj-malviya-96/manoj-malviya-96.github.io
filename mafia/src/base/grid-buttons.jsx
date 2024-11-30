import React from 'react';
import PrimaryButton from './primary-button';
import {validateStructTypeForList} from "../utils/types";

const GridButtons = ({items, className}) => {
    validateStructTypeForList(items, 'GridButtonItem');

    return (
        <div className="w-fit h-fit grid grid-cols-4 md:grid-cols-8 gap-4">
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
