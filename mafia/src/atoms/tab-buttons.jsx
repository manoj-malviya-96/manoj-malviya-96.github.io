import React from 'react';
import AtomButton from './atom-button';
import {validateStructTypeForList} from "../utils/types";

const GridButtons = ({items, className}) => {
    validateStructTypeForList(items, 'GridButtonItem');

    return (
        <div className="w-fit h-fit grid grid-cols-4 md:grid-cols-8 border-2 border-opacity-25 border-primary rounded-lg">
            {items.map((item, index) => (
                <AtomButton
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
