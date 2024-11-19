import { Link, Element } from 'react-scroll';

//! Scroll to the section when a tab is clicked.
const TabBar = ({ tabs }) => {
    {/* Should be a list of objects with `name`, `label`, and `icon` and window should have ElementType with name=name*/}
    return (
        <div className="tabs tabs-bordered">
            {tabs.map((tab) => (
                <Link
                    key={tab.name}
                    to={tab.name} // Matches the section's `name`
                    spy={true} // Monitors scroll and sets active class
                    smooth={true} // Smooth scrolling
                    offset={-50} // Adjust for navbar height if needed
                    duration={500} // Scrolling duration in ms
                    className="tab tab-bordered"
                    activeClass="tab-active"
                >
                    <i className={`${tab.icon} mr-2`}></i>
                    <span className="hidden sm:inline">{tab.label}</span>
                </Link>
            ))}
        </div>
    );
};

export default TabBar;

