import React from 'react';
import profilePicture from '../assets/main.jpg';
import PrimaryButton from "../base/button";
import { Element } from 'react-scroll';
import FullScreenPage from "../base/page";

const IntroOverlay = () => {
    return (
        <div className="max-w-lg text-left bg-black/50 p-4">
            <p className="text-lg mb-4">
                Manoj Malviya
            </p>
            <h1 className="text-4xl font-bold mb-4"> Software Developer </h1>
            <PrimaryButton label="Get Started" href="/apps"/>
        </div>
    )
}

const IntroPage = () => {
    return (
        <FullScreenPage
            name="intro"
            backgroundImage={profilePicture}
            children={
                <IntroOverlay/>
            }
        />
    );
};

export default IntroPage;
