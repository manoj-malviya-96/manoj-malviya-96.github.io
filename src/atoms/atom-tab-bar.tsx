import AtomScrollableLink from "./atom-scrollable-link";
import React from "react";
import {AtomLayoutGap, AtomRow} from "./atom-layout";


export interface TabItemProps {
	name: string;
	label?: string;
	icon?: string;
}

const TabItem: React.FC<TabItemProps> = ({label, icon}) => {
	return (
		<div
			className="active:scale-95 cursor-pointer p-0 m-0 tooltip tooltip-bottom"
			data-tip={label}>
			<i className={`${icon} mr-1`}></i>
			<span className="hidden sm:inline">{label}</span>
		</div>
	);
};

export interface TabBarProps {
	items: Array<TabItemProps>;
	className?: string;
}


//! Scroll to the section when a tab is clicked.
export const AtomLinkBarRow: React.FC<TabBarProps> = ({items, className = ''}) => {
	return (
		<AtomRow className={`bg-primary border-neutral border-opacity-50 bg-opacity-50
		                    border backdrop-blur-lg rounded-full
		                    ${className}`}
		         gap={AtomLayoutGap.None}>
			{items.map((item, index) => (
				<AtomScrollableLink
					key={index}
					elementName={item.name}
					className={`md:px-6 py-2 gap-2 w-fit h-full text-center cursor-pointer text-sm
					    ${index === 0 ? 'rounded-l-full' : index === items.length - 1 ? 'rounded-r-full' : ''}
					`}
					activeClassName="bg-secondary text-secondary-content"
					children={
						<TabItem
							name={item.name}
							label={item.label}
							icon={item.icon}
						/>
					}
				/>
			))}
		</AtomRow>
	);
};
