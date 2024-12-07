import { Link } from 'react-scroll';

//! Scroll to the section when a tab is clicked.
const ScrollableLink = ({elementName, className, activeClassName, children}) => {
    return (
        <Link
            key={elementName}
            to={elementName} // Matches the section's `name`
            spy={true} // Monitors scroll and sets active class
            smooth={true} // Smooth scrolling
            offset={0} // Adjust for navbar height if needed
            duration={300} // Scrolling duration in ms
            className={className}
            activeClass={activeClassName}
        >
            {children}
        </Link>
    );
};

export default ScrollableLink;

