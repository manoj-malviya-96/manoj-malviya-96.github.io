import React from 'react';
import {AtomButtonProps, AtomButton} from './atom-button';

interface AtomButtonGroupProps {
    items: Array<AtomButtonProps>;
}

const AtomButtonGroup: React.FC<AtomButtonGroupProps> = React.memo(({items}) => {
    return (
        <div
            className="flex flex-row gap-0 justify-content-center w-fit h-fit
                        border border-primary rounded-lg">
            {items.map((item, index) => (
                <AtomButton
                    key={index}
                    {...item}
                />
            ))}
        </div>
    );
});


export default AtomButtonGroup;
