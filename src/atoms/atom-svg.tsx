import React from 'react';
import {useTheme} from "../providers/theme";


interface AtomSvgProps {
    src: string;
    alt: string;
    className?: string;
}

const AtomSvg: React.FC<AtomSvgProps> = React.memo(({src, alt, className}) => {
    const {isDark} = useTheme();
    return <img src={src} alt={alt}
                className={className}
                loading="eager"
                style={{filter: isDark ? 'brightness(169%)' : ''}}/>;
});
export default AtomSvg;