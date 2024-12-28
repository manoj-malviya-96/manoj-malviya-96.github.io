import React from "react";
import AtomScrollableLink from "./atom-scrollable-link";


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
        <div className={`flex flex-col gap-2 ${className}`}>
            {sections.map((item, index) => (
                <AtomScrollableLink
                    key={index}
                    elementName={item.name}
                    className="px-2 text-sm cursor-pointer "
                    activeClassName="text-primary-content text-sm font-bold"
                    children={
                        <span>{item.label}</span>
                    }
                />
            ))}
        </div>
    )
});

export default AtomTableOfContents;