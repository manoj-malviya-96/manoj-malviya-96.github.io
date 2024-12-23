import React from 'react';
import {useTheme} from "../providers/theme";


interface AtomSvgProps {
    src: string;
    alt: string;
    className?: string;
}

const _AtomSvg: React.FC<AtomSvgProps> = ({src, alt, className}) => {
    const {isDark} = useTheme();
    return <img src={src} alt={alt}
                className={className}
                loading="eager"
                style={{filter: isDark ? 'brightness(169%)' : 'brightness(69%)'}}/>;
}

const AtomSvg = React.memo(_AtomSvg);
export default AtomSvg;