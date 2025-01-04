import React from 'react';
import AtomFullScreenContainer from "../atoms/atom-full-screen-container";
import ProfilePicture from "./assets/main.jpg";
import {AtomButton} from "../atoms/atom-button";
import AtomImage from "../atoms/atom-image";
import {AtomSuperHeroBrandTitleText} from "../atoms/atom-text";

const Intro = () => {
    return (
        <AtomFullScreenContainer
            name="intro"
            children={
                (
                    <div className={`w-full h-full flex flex-col-reverse
                                     md:flex-row gap-4 p-8 items-center`}>
                        <div
                            className="flex flex-col flex-wrap p-2 gap-4
                                        items-center justify-center">
                            <span className={'w-full text-center'}>Manoj Malviya</span>
                            
                            <AtomSuperHeroBrandTitleText
                                className={'text-center w-full'}
                                text={`Multidisciplinary software engineer`}/>
                            <span className={'w-full text-center'}>
                                Innovating with knack of creativity and problem solving
                            </span>
                            
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
