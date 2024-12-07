import ScrollableLink from "./scrollable-link";
import {validateStructTypeForList} from "../utils/types";

const TabElement = ({label, icon}) => {
    return (
        <div className="active:scale-95 cursor-pointer p-0 m-0 tooltip tooltip-bottom" data-tip={label}>
            <i className={`${icon} mr-1`}></i>
            <span className="hidden sm:inline">{label}</span>
        </div>
    );
};


//! Scroll to the section when a tab is clicked.
const TabBar = ({tabs, className=''}) => {
    validateStructTypeForList(tabs, 'TabItem');
    return (
        <div className={`tabs tabs-bordered px-3 gap-0 ${className}`}>
            {tabs.map((tab, index) => (
                <ScrollableLink
                    key={index}
                    elementName={tab.name}
                    className="tab px-2 m-0"
                    activeClassName="tab-active"
                    children={
                        <TabElement
                            label={tab.label}
                            icon={tab.icon}
                        />
                    }
                />
            ))}
        </div>
    );
};
export default TabBar;
