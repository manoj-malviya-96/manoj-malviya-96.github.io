import React from 'react'
import {AtomButton, AtomButtonProps} from "./atom-button";


interface AtomGroupProps {
	label?: string;
	children: React.ReactNode;
	layout?: 'horizontal' | 'vertical';
	className?: string;
	hug?: boolean;
}

const AtomGroup: React.FC<AtomGroupProps> = ({label, children, hug = false, layout = 'vertical', className = ''}) => {
	return (
		<div className={`flex flex-col gap-1 ${className}`}>
			{label && <label className="text-xs text-neutral">{label}</label>}
			<div
				className={`flex flex-${layout === 'vertical' ? 'col' : 'row'}
                        ${hug ? 'p-0 gap-0' : 'p-4 gap-4`'}
                        rounded-md hover:shadow
                        bg-transparent
                        border border-neutral border-opacity-50
                        backdrop-blur-lg w-full h-fit
                        justify-center items-center`}>
				{children}
			</div>
		</div>
	);
};

export default AtomGroup;

interface AtomButtonGroupProps {
	label?: string;
	items: Array<AtomButtonProps>;
}

export const AtomButtonGroup: React.FC<AtomButtonGroupProps> = React.memo(({label, items}) => {
	return (
		<AtomGroup
			label={label}
			layout={'horizontal'}
			hug={true}
			className="flex flex-row gap-0 justify-content-center w-fit h-fit">
			{items.map((item, index) => (
				<AtomButton
					key={index}
					{...item}
				/>
			))}
		</AtomGroup>
	);
});
