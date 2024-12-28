import {Link} from 'react-scroll';
import React from "react";

interface ScrollableLinkProps {
    elementName: string;
    className?: string;
    activeClassName?: string;
    children: React.ReactNode;
}

//! Scroll to the section when a tab is clicked.
const AtomScrollableLink: React.FC<ScrollableLinkProps> = React.memo(({
                                                                          elementName,
                                                                          className,
                                                                          activeClassName,
                                                                          children
                                                                      }) => {
    return (
        <Link
            key={elementName}
            to={elementName}
            spy={true}
            smooth={true}
            offset={0}
            duration={300}
            className={className}
            activeClass={activeClassName}
        >
            {children}
        </Link>
    );
});

export default AtomScrollableLink;

