import React from "react";
import AtomScrollableLink from "./atom-scrollable-link";
import { AtomColumn, LayoutAlign, LayoutGap, LayoutSize } from "./atom-layout";
import { AtomPrimaryText, AtomSecondaryText } from "./atom-text";

export interface TableOfContentsItemProps {
  name: string;
  label: string;
}

interface TableOfContentsProps {
  className?: string;
  label?: string;
  sections: Array<TableOfContentsItemProps>;
}

const AtomTableOfContents: React.FC<TableOfContentsProps> = React.memo(
  ({ sections, label, className }) => {
    return (
      <AtomColumn
        gap={LayoutGap.None}
        size={LayoutSize.None}
        alignment={LayoutAlign.Start}
        className={className}
      >
        {label && (
          <AtomPrimaryText
            className={"w-1/4 min-w-fit border-b my-2 border-secondary"}
          >
            {label}
          </AtomPrimaryText>
        )}
        {sections.map((item, index) => (
          <AtomScrollableLink
            key={index}
            elementName={item.name}
            className="cursor-pointer"
            activeClassName="w-fit bg-secondary text-secondary-content"
            children={<AtomSecondaryText>{item.label}</AtomSecondaryText>}
          />
        ))}
      </AtomColumn>
    );
  },
);

export default AtomTableOfContents;
