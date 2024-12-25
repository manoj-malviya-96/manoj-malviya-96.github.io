import React from "react";


interface AtomBrandTextProps {
    text: string;
    className?: string
}

const AtomBrandText = ({text, className}: AtomBrandTextProps) => {
    return (
        <span className={`text-accent font-extrabold
                        text-5xl uppercase text-center ${className}`}>{text}</span>
    );
}

export default AtomBrandText;