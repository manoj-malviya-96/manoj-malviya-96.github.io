import {Image} from 'primereact/image';
import React from "react";


interface AtomImageProps {
    src: string;
    alt: string;
    className?: string;
    preview?: boolean;
}

const _AtomImage: React.FC<AtomImageProps> = ({src, alt, preview=true, className = ''}) => {
    return (
        <div className={`card flex justify-content-center ${className}`}>
            <Image src={src} alt={alt} loading={'lazy'} preview={preview}/>
        </div>
    );
};

const AtomImage = React.memo(_AtomImage);
export default AtomImage;
