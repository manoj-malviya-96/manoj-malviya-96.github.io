import React from 'react';
import {ButtonGroup} from "primereact/buttongroup";
import {AtomButton, AtomButtonProps} from './atom-button';

// Import or reuse AtomButtonProps from AtomButton definition

interface AtomButtonGroupProps {
    items: Array<AtomButtonProps>; // List of button props
}

const AtomButtonGroup: React.FC<AtomButtonGroupProps> = ({items}) => {
    return (
        <div className="justify-content-center w-fit h-fit bg-black bg-opacity-25 rounded-lg">
            <ButtonGroup>
                {items.map((item, index) => (
                    <AtomButton
                        key={index}
                        {...item} // Spread the props for simplicity
                        ghostMode={true} // Override defaults as needed
                        rounded={false}
                        size="large"
                    />
                ))}
            </ButtonGroup>
        </div>
    );
};

export default AtomButtonGroup;
