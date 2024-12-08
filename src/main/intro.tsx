import React from 'react';
import FullScreenPage from "../atoms/full-page";
import AtomButtonGroup from "../atoms/atom-button-group";
import {rangesTo} from "../common/types";
import {openLink} from "../common/links";
import {AtomButtonProps} from "../atoms/atom-button";
import ProfilePicture from "../main/assets/main.jpg";


type SocialMediaLink = [icon: string, link: string, tooltip: string];
const MySocialMediaLinks: Array<SocialMediaLink> = [
    ['fa-brands fa-linkedin', 'https://www.linkedin.com/in/manoj-malviya-44700aa4/', 'linkedin'],
    ['fa-brands fa-github', 'https://github.com/manoj-malviya-96', 'github'],
    ['fa-brands fa-google', 'https://scholar.google.com/citations?user=0oMXOy0AAAAJ&hl=en&authuser=2',
        'google scholar'],
    ['fa-brands fa-instagram', 'https://www.instagram.com/manoj_malviya_/', 'instagram'],
    ['fa-brands fa-youtube', 'https://www.youtube.com/@manoj_malviya', 'youtube'],
    ['fa-brands fa-apple', 'https://music.apple.com/us/artist/manoj-malviya/1721435458', 'apple music'],
    ['fa-brands fa-soundcloud', 'https://soundcloud.com/manoj-malviya-96', 'soundcloud'],
];

const IntroOverlay = () => {
    const socialMediaItems = rangesTo(
        MySocialMediaLinks, (smLink: SocialMediaLink) => {
            return {
                icon: smLink[0],
                onClick: () => openLink(smLink[1], null),
                tooltip: smLink[2],
            } as AtomButtonProps;
        });

    return (
        <div className="absolute left-8 top-1/3">
            <p className="text-lg mb-1">
                Manoj Malviya
            </p>
            <h1 className="text-4xl text-white font-bold mb-4">SOFTWARE ENGINEER</h1>
            <AtomButtonGroup items={socialMediaItems}/>
        </div>
    )
}

const Intro = () => {
    return (
        <FullScreenPage
            name="intro"
            backgroundImage={ProfilePicture}
            children={
                <IntroOverlay/>
            }
        />
    );
};

export default Intro;
