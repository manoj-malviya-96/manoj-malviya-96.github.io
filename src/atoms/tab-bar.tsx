import ScrollableLink from "./scrollable-link";
import React from "react";


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
const TabBar: React.FC<TabBarProps> = ({items, className = ''}) => {
    return (
        <div
            className={`tabs tabs-bordered px-3 gap-0 bg-primary rounded-full ${className}`}>
            {items.map((item, index) => (
                <ScrollableLink
                    key={index}
                    elementName={item.name}
                    className="tab px-2 m-0"
                    activeClassName="tab-active"
                    children={
                        <TabItem
                            name={item.name}
                            label={item.label}
                            icon={item.icon}
                        />
                    }
                />
            ))}
        </div>
    );
};
export default TabBar;
