import React from 'react';
import profilePicture from '../assets/main.jpg';
import PrimaryButton from "../base/button";
import { Element } from 'react-scroll';
import FullScreenPage from "../base/page";

const IntroOverlay = () => {
    return (
        <div className="max-w-lg text-left p-4">
            <p className="text-lg text-black-50 mb-4">
                Manoj Malviya
            </p>
            <h1 className="text-4xl font-bold mb-4 text-black"> Software Developer </h1>
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
            childrenAlignment='items-center'
        />
    );
};

export default IntroPage;
