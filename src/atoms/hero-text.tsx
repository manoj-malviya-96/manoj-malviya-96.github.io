import React from "react";

interface HeroTextProps {
    text: string;
    className?: string;
}


const HeroText: React.FC<HeroTextProps> = ({text, className}) => {
    return (
        <div className={`${className} m-auto align-center rounded-lg justify-center p-8
                                                bg-gradient-to-r from-info to-error bg-opacity-50`}>
            <h2 className='text-2xl text-center font-bold uppercase'>{text}</h2>
        </div>
    );
}

export default HeroText;