import {Image} from 'primereact/image';
import React from "react";


interface AtomImageProps {
    src: string;
    alt: string;
    className?: string;
    preview?: boolean;
    showLabel?: boolean;
}

const _AtomImage: React.FC<AtomImageProps> = ({
                                                  src,
                                                  alt,
                                                  preview = true,
                                                  showLabel = false,
                                                  className = ''
                                              }) => {
    return (
        <div
            className={`card flex justify-content-center gap-2 ${className}`}>
            <Image src={src} alt={alt} loading={'lazy'}
                   preview={preview}/>
            {showLabel && <span
                className="text-neutral text-sm ">{alt}</span>}
        </div>
    );
};

const AtomImage = React.memo(_AtomImage);
export default AtomImage;
