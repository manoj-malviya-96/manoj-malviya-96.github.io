import React from "react";
import MotionDiv from "./motion-div";

interface HeroTextProps {
    text: string;
    upperCase?: boolean;
    className?: string;
}


const HeroText: React.FC<HeroTextProps> = ({text, upperCase = true, className}) => {
    return (
        <div className={`${className} m-auto align-center rounded-lg
                    justify-center p-8 cursor-pointer`}>
            <MotionDiv>
                <h2 className={`text-2xl text-center font-bold  ${upperCase ? 'uppercase' : ''}`}>{text}</h2>
            </MotionDiv>
        </div>
    );
}

export default HeroText;