import React from 'react';
import {AtomButtonProps, AtomButton} from './atom-button';
import AtomGroup from "./atom-group";

interface AtomButtonGroupProps {
    items: Array<AtomButtonProps>;
}

const AtomButtonGroup: React.FC<AtomButtonGroupProps> = React.memo(({items}) => {
    return (
        <AtomGroup
            layout={'horizontal'}
            className="flex flex-row gap-0 p-0 justify-content-center w-fit h-fit">
            {items.map((item, index) => (
                <AtomButton
                    key={index}
                    {...item}
                />
            ))}
        </AtomGroup>
    );
});


export default AtomButtonGroup;
