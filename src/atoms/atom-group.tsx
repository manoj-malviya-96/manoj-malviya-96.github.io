import React from 'react'


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