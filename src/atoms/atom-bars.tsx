import AtomScrollableLink from "./atom-scrollable-link";
import React, { useEffect } from "react";
import AtomButton, {
  ButtonSeverity,
  ButtonSize,
  ButtonType,
} from "./atom-button";

export enum TabBarOrientation {
  Horizontal = "flex-row",
  Vertical = "flex-col",
}

interface TabBarProps {
  children: React.ReactNode;
  orientation?: TabBarOrientation;
  className?: string;
}

const AtomBar: React.FC<TabBarProps> = ({
  children,
  orientation = TabBarOrientation.Horizontal,
  className = "",
}) => {
  return (
    <div
      className={`flex ${orientation} gap-0 justify-center items-center w-fit h-fit
							bg-primary border-neutral border-opacity-50 bg-opacity-50
		                    border backdrop-blur-lg rounded-lg
		                    ${className}`}
    >
      {children}
    </div>
  );
};

export interface TabLinkItemProps {
  name: string;
  children?: React.ReactNode;
}

export interface TabBarLinkProps {
  items: Array<TabLinkItemProps>;
  orientation?: TabBarOrientation;
  className?: string;
}

//! Scroll to the section when a tab is clicked.
export const AtomLinkBar: React.FC<TabBarLinkProps> = ({
  items,
  orientation = TabBarOrientation.Horizontal,
  className = "",
}) => {
  return (
    <AtomBar orientation={orientation} className={className}>
      {items.map((item, index) => (
        <AtomScrollableLink
          key={index}
          elementName={item.name}
          className={`px-6 py-2 w-fit h-full text-center cursor-pointer text-sm
					    ${index === 0 ? "rounded-l-lg" : index === items.length - 1 ? "rounded-r-lg" : ""}
					`}
          activeClassName="bg-secondary text-secondary-content"
        >
          {item.children}
        </AtomScrollableLink>
      ))}
    </AtomBar>
  );
};

export interface TabButtonProps {
  label: string;
  icon?: string;
  onClick: () => void;
}

export interface AtomButtonBarProps {
  items: TabButtonProps[];
  className?: string;
  buttonSize?: ButtonSize;
  orientation?: TabBarOrientation;
}

export const AtomButtonBar: React.FC<AtomButtonBarProps> = ({
  items,
  orientation = TabBarOrientation.Horizontal,
  buttonSize = ButtonSize.Medium,
  className = "",
}) => {
  const [activeIndex, setActiveIndex] = React.useState<number>(0);

  useEffect(() => {
    if (items.length > 0) {
      items[activeIndex].onClick();
    }
  }, [activeIndex, items]);

  return (
    <AtomBar orientation={orientation} className={className}>
      {items.map((item, index) => (
        <AtomButton
          key={index}
          label={item.label}
          icon={item.icon}
          severity={
            activeIndex === index
              ? ButtonSeverity.Secondary
              : ButtonSeverity.Primary
          }
          size={buttonSize}
          type={activeIndex === index ? ButtonType.Solid : ButtonType.Ghost}
          onClick={() => setActiveIndex(index)}
          hoverEffect={false}
          pill={false}
        />
      ))}
    </AtomBar>
  );
};
