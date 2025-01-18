import AtomScrollableLink from "./atom-scrollable-link";
import React from "react";


export interface TabLinkItemProps {
	name: string;
	children?: React.ReactNode;
}

export enum TabBarOrientation {
	Horizontal = 'flex-row',
	Vertical = 'flex-col',
}

export interface TabBarLinkProps {
	items: Array<TabLinkItemProps>;
	orientation?: TabBarOrientation;
	className?: string;
}


//! Scroll to the section when a tab is clicked.
export const AtomLinkBarRow: React.FC<TabBarLinkProps> = ({items, orientation=TabBarOrientation.Horizontal, className = ''}) => {
	return (
		<div className={`flex ${orientation} gap-0 justify-center items-center w-fit h-fit
							bg-primary border-neutral border-opacity-50 bg-opacity-50
		                    border backdrop-blur-lg rounded-full
		                    ${className}`}>
			{items.map((item, index) => (
				<AtomScrollableLink
					key={index}
					elementName={item.name}
					className={`px-6 py-2 w-fit h-full text-center cursor-pointer text-sm
					    ${index === 0 ? 'rounded-l-full' : index === items.length - 1 ? 'rounded-r-full' : ''}
					`}
					activeClassName="bg-secondary text-secondary-content">
					{item.children}
				</AtomScrollableLink>
			))}
		</div>
	);
};
