import {Link} from 'react-scroll';
import React from "react";

interface ScrollableLinkProps {
    elementName: string;
    className?: string;
    activeClassName?: string;
    children: React.ReactNode;
}

//! Scroll to the section when a tab is clicked.
const AtomScrollableLink: React.FC<ScrollableLinkProps> = ({
                                                           elementName,
                                                           className,
                                                           activeClassName,
                                                           children
                                                       }) => {
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

export default AtomScrollableLink;

