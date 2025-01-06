import React from "react";
import AtomScrollableLink from "./atom-scrollable-link";
import {AtomColumn, AtomLayoutAlignment, AtomLayoutGap} from "./atom-layout";
import {AtomPrimaryText, AtomSecondaryText} from "./atom-text";


export interface TableOfContentsItemProps {
	name: string;
	label: string;
}

interface TableOfContentsProps {
	className?: string;
	label?: string;
	sections: Array<TableOfContentsItemProps>;
}

const AtomTableOfContents: React.FC<TableOfContentsProps> = React.memo(({
	                                                                        sections,
	                                                                        label,
	                                                                        className
                                                                        }) => {
	return (
		<AtomColumn
			gap={AtomLayoutGap.None}
			alignment={AtomLayoutAlignment.Start}
			className={className}
		>
			{label && <AtomPrimaryText text={label} className={'w-full border-b my-2 border-secondary'}/>}
			{sections.map((item, index) => (
				<AtomScrollableLink
					key={index}
					elementName={item.name}
					className="cursor-pointer"
					activeClassName="text-accent font-bold"
					children={
						<AtomSecondaryText text={item.label}/>
					}
				/>
			))}
		</AtomColumn>
	)
});

export default AtomTableOfContents;