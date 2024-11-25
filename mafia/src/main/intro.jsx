import React from 'react';
import profilePicture from './assets/main.jpg';
import PrimaryButton from "../base/primary-button";
import FullScreenPage from "../base/full-page";

const IntroOverlay = () => {
    return (
        <div className="max-w-lg text-left p-4">
            <p className="text-lg text-primary mb-4">
                Manoj Malviya
            </p>
            <h1 className="text-4xl font-bold mb-4 text-black"> Software Developer </h1>
            <PrimaryButton label="Get Started" href="/apps"/>
        </div>
    )
}

const Intro = () => {
    return (
        <FullScreenPage
            name="intro"
            backgroundImage={profilePicture}
            children={
                <IntroOverlay/>
            }
            childrenAlignment='items-center'
        />
    );
};

export default Intro;
