import ScrollableLink from "./scrollable-link";
import {validateStructType} from "../utils/types";

const TabElement = ({label, icon}) => {
    return (
        <div className="active:scale-95 cursor-pointer">
            <i className={`${icon} mr-2`}></i>
            <span className="hidden sm:inline">{label}</span>
        </div>
    );
};


//! Scroll to the section when a tab is clicked.
const TabBar = ({tabs}) => {
    tabs.forEach((tab)=>validateStructType(tab, 'TabItem'));
    return (
        <div className="tabs tabs-bordered px-3">
            {tabs.map((tab) => (
                <ScrollableLink
                    elementName={tab.name}
                    className="tab"
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

