import {Image} from 'primereact/image';
import React from "react";


interface AtomImageProps {
    src: string;
    alt: string;
    className?: string;
}

const AtomImage: React.FC<AtomImageProps> = ({src, alt, className = ''}) => {
    return (
        <div className={`card flex justify-content-center ${className}`}>
            <Image src={src} alt={alt} preview/>
        </div>
    );
};

export default AtomImage;
