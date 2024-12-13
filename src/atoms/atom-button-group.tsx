import React from 'react';
import {AtomButtonProps, AtomButton} from './atom-button';

// Import or reuse AtomButtonProps from AtomButton definition

interface AtomButtonGroupProps {
    items: Array<AtomButtonProps>; // List of button props
}

const AtomButtonGroup: React.FC<AtomButtonGroupProps> = React.memo(({items}) => {
    return (
        <div
            className="flex flex-row gap-0 justify-content-center w-fit h-fit bg-black bg-opacity-25 rounded-lg">
            {items.map((item, index) => (
                <AtomButton
                    key={index}
                    {...item}
                    ghost={true}
                    rounded={false}
                    size="large"
                />
            ))}
        </div>
    );
});


export default AtomButtonGroup;
