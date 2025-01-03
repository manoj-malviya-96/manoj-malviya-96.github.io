import React from 'react'
import {AtomButton, AtomButtonProps} from "./atom-button";


export enum AtomGroupLayout {
	Horizontal = 'flex-row',
	Vertical = 'flex-col',
	Grid3 = 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
	Grid5 = 'grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5',
}

interface AtomGroupProps {
	label?: string;
	children: React.ReactNode;
	layout?: AtomGroupLayout;
	className?: string;
	hug?: boolean;
}

const AtomGroup: React.FC<AtomGroupProps> = ({
	                                             label,
	                                             children,
	                                             hug = false,
	                                             layout = AtomGroupLayout.Horizontal,
	                                             className = ''
                                             }) => {
	return (
		<div className={`flex flex-col gap-1 ${className}`}>
			{label && <label className="text-xs text-neutral">{label}</label>}
			<div
				className={`flex ${layout} ${hug ? ' p-0 gap-0' : ' p-4 gap-4'}
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
	className?: string;
	items: Array<AtomButtonProps>;
}

export const AtomButtonGroup: React.FC<AtomButtonGroupProps> = React.memo(({label, items, className}) => {
	return (
		<AtomGroup
			layout={AtomGroupLayout.Grid3}
			label={label}
			hug={true}
			className={`flex flex-row gap-0 p-0 justify-content-center w-fit h-fit ${className}`}
		>
			{items.map((item, index) => (
				<AtomButton
					key={index}
					{...item}
				/>
			))}
		</AtomGroup>
	);
});
