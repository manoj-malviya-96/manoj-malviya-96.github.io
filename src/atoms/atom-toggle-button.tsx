import React, {useEffect, useState} from 'react';
import {AtomButton, AtomButtonProps} from "./atom-button";

interface AtomToggleButtonProps extends AtomButtonProps {
    onLabel?: string;
    offLabel?: string;
    onIcon?: string;
    offIcon?: string;
    onChange?: (value: boolean) => void;
    initValue?: boolean;
}

const AtomToggleButton: React.FC<AtomToggleButtonProps> = React.memo(({
                                                                          onLabel,
                                                                          offLabel,
                                                                          onIcon,
                                                                          offIcon,
                                                                          onChange,
                                                                          initValue = false,
                                                                          ...props
                                                                      }) => {
    const [checked, setChecked] = useState<boolean>(initValue);
    
    useEffect(() => {
        setChecked(initValue);
    }, [initValue]);
    
    if (!onLabel) {
        onLabel = offLabel;
    }
    if (!onIcon && offIcon) {
        onIcon = offIcon;
    }
    
    const onToggle = () => {
        const newValue = !checked;
        setChecked(newValue);
        if (onChange) {
            onChange(newValue);
        }
    };
    
    return (
        <AtomButton
            {...props}
            label={checked ? onLabel : offLabel}
            icon={checked ? onIcon : offIcon}
            onClick={onToggle}
        />
    );
});
export default AtomToggleButton;
