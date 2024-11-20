import {Link} from 'react-scroll';
import ScrollableLink from "./scrollable-link";

const TabElement = ({label, icon}) => {
    return (
        <div>
            <i className={`${icon} mr-2`}></i>
            <span className="hidden sm:inline">{label}</span>
        </div>
    );
};


//! Scroll to the section when a tab is clicked.
const TabBar = ({tabs}) => {
    {/* Should be a list of objects with `name`, `label`, and `icon` and window should have ElementType with name=name*/
    }
    return (
        <div className="tabs tabs-bordered">
            {tabs.map((tab) => (
                <ScrollableLink
                    elementName={tab.name}
                    className="tab tab-bordered"
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

