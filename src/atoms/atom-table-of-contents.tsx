import React from "react";
import AtomScrollableLink from "./atom-scrollable-link";
import {AtomColumn, AtomLayoutGap} from "./atom-layout";


export interface TableOfContentsItemProps {
	name: string;
	label: string;
}

interface TableOfContentsProps {
	className?: string;
	sections: Array<TableOfContentsItemProps>;
}

const AtomTableOfContents: React.FC<TableOfContentsProps> = React.memo(({
	                                                                        sections,
	                                                                        className
                                                                        }) => {
	return (
		<AtomColumn className={className} gap={AtomLayoutGap.Small}>
			{sections.map((item, index) => (
				<AtomScrollableLink
					key={index}
					elementName={item.name}
					className="px-2 text-sm cursor-pointer "
					activeClassName="text-primary-content text-sm font-bold underline"
					children={
						<span>{item.label}</span>
					}
				/>
			))}
		</AtomColumn>
	)
});

export default AtomTableOfContents;