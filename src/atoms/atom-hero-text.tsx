import React from "react";
import AtomSimpleMotionContainer from "./atom-simple-motion-container";

interface HeroTextProps {
    text: string;
    upperCase?: boolean;
    className?: string;
}


const AtomHeroText: React.FC<HeroTextProps> = ({text, upperCase = true, className}) => {
    return (
        <div className={`${className} m-auto align-center rounded-lg
                    justify-center p-8 cursor-pointer`}>
            <AtomSimpleMotionContainer>
                <h2 className={`text-2xl text-center font-bold  ${upperCase ? 'uppercase' : ''}`}>{text}</h2>
            </AtomSimpleMotionContainer>
        </div>
    );
}

export default AtomHeroText;