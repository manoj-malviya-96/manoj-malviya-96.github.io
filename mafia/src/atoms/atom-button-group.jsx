import React from 'react';
import AtomButton from './atom-button';
import {validateStructTypeForList} from "../utils/types";
import {ButtonGroup} from "primereact/buttongroup";

const AtomButtonGroup = ({items}) => {
    validateStructTypeForList(items, 'ButtonGroupItem');
    return (
        <div className="justify-content-center w-fit h-fit bg-black bg-opacity-25 rounded-lg">
            <ButtonGroup>
                {items.map((item, index) => (
                    <AtomButton
                        key={index}
                        icon={item.icon}
                        onClick={item.onClick}
                        tooltip= {item.tooltip}
                        ghostMode={true}
                        rounded={false}
                        size="large"
                    />
                ))}
            </ButtonGroup>
        </div>
    );
};

export default AtomButtonGroup;
