import React from 'react';
import AtomFullScreenContainer from "../atoms/atom-full-screen-container";
import ProfilePicture from "./assets/main.jpg";
import {AtomButton, ButtonType} from "../atoms/atom-button";

const Intro = () => {
    return (
        <AtomFullScreenContainer
            name="intro"
            backgroundImage={ProfilePicture}
            children={
                (
                    <>
                        <div
                            className="absolute left-8 top-1/3 w-fit md:w-1/3 p-4">
                            <p className="text-lg mb-1 text-black">
                                Manoj's
                            </p>
                            <h1 className="text-4xl text-black font-bold mb-4 uppercase">
                                Audacious Factory Of Interactive Apps
                            </h1>
                        </div>
                        <div className="absolute bottom-8 left-1/2">
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
                    </>
                )
            }
        />
    );
};

export default Intro;
