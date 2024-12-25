import React from "react";


interface AtomBrandTextProps {
    text: string;
    className?: string
}

const AtomBrandText = ({text, className}: AtomBrandTextProps) => {
    return (
        <span className={`text-accent font-extrabold text-wrap
                        text-4xl uppercase
                        whitespace-normal break-words ${className}`}>{text}</span>
    );
}

export default AtomBrandText;