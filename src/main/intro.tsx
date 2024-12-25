import React from 'react';
import AtomFullScreenContainer from "../atoms/atom-full-screen-container";
import ProfilePicture from "./assets/main.jpg";
import {AtomButton} from "../atoms/atom-button";
import AtomImage from "../atoms/atom-image";
import AtomBrandText from "../atoms/atom-brand-text";

const Intro = () => {
    return (
        <AtomFullScreenContainer
            name="intro"
            children={
                (
                    <div className={'w-full h-full flex flex-row gap-2 p-8'}>
                        <div
                            className="flex flex-col gap-4 items-center justify-center p-4 w-1/2">
                            Manoj Malviya
                            <AtomBrandText text={`Multidisciplinary software engineer`} />
                            innovating with knack of creativity and problem solving.
                            
                            <AtomButton
                                icon="fas fa-arrow-down"
                                label="Scroll Down for more"
                                animated={true}
                                onClick={() => {
                                    window.scroll({
                                        top: window.innerHeight,
                                        behavior: 'smooth'
                                    });
                                }}
                            />
                        </div>
                        <AtomImage src={ProfilePicture} alt={'profile picture'}
                                   className={'rounded-lg'}/>
                    </div>
                )
            }
        />
    );
};

export default Intro;
