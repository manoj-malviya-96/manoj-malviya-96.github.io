import React from "react";
import AtomScrollableLink from "./atom-scrollable-link";
import {AtomColumn, AtomLayoutAlignment, AtomLayoutGap} from "./atom-layout";
import {AtomSecondaryText} from "./atom-text";


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
		<AtomColumn
			gap={AtomLayoutGap.None}
			alignment={AtomLayoutAlignment.Start}
			className={className}
		>
			{sections.map((item, index) => (
				<AtomScrollableLink
					key={index}
					elementName={item.name}
					className="cursor-pointer"
					activeClassName="text-secondary text-lg font-bold"
					children={
						<AtomSecondaryText text={item.label}/>
					}
				/>
			))}
		</AtomColumn>
	)
});

export default AtomTableOfContents;