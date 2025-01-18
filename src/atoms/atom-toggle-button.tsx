import React, {useEffect, useState} from 'react';
import {AtomButton, AtomButtonProps, ButtonType} from "./atom-button";

export interface ToggleButtonProps extends AtomButtonProps {
	onLabel?: string;
	offLabel?: string;
	onIcon?: string;
	offIcon?: string;
	onChange?: (value: boolean) => void;
	initValue?: boolean;
}

const AtomToggleButton: React.FC<ToggleButtonProps> = React.memo(({
	                                                                  onLabel,
	                                                                  offLabel,
	                                                                  onIcon,
	                                                                  offIcon,
	                                                                  onChange,
	                                                                  initValue = false,
	                                                                  ...props
                                                                  }) => {
	if (!offLabel && !onLabel && !offIcon && !onIcon) {
		throw new Error('At least one of the following props must be set: offLabel, onLabel, offIcon, onIcon');
	}
	const [checked, setChecked] = useState<boolean>(initValue);
	
	useEffect(() => {
		setChecked(initValue);
	}, [initValue]);
	
	// If only one label is set, use it for both states.
	if (!onLabel && offLabel) {
		onLabel = offLabel;
	}
	if (!offLabel && onLabel) {
		offLabel = onLabel;
	}
	// If only one icon is set, use it for both states.
	if (!onIcon && offIcon) {
		onIcon = offIcon;
	}
	if (!offIcon && onIcon) {
		offIcon = onIcon;
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
