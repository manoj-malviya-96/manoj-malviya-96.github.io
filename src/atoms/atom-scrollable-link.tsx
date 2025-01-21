import {Link} from 'react-scroll';
import React from "react";

interface ScrollableLinkProps {
	elementName: string;
	className?: string;
	activeClassName?: string;
	children: React.ReactNode;
}

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
			horizontal={false}
			absolute={false}
			duration={420}
			className={className}
			activeClass={activeClassName}
		>
			{children}
		</Link>
	);
});

export default AtomScrollableLink;

