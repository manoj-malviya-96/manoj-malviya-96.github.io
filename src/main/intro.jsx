import React from 'react';
import profilePicture from './assets/main.jpg';
import FullScreenPage from "../atoms/full-page";
import AtomButtonGroup from "../atoms/atom-button-group";
import {createButtonGroupItem, rangesTo} from "../utils/types";
import {openLink} from "../utils/links";


const socialMediaLinkIconAndTooltip = [
    ['fa-brands fa-linkedin', 'https://www.linkedin.com/in/manoj-malviya-44700aa4/', 'linkedin'],
    ['pi pi-github', 'https://github.com/manoj-malviya-96', 'github'],
    ['pi pi-google', 'https://scholar.google.com/citations?user=0oMXOy0AAAAJ&hl=en&authuser=2', 'google scholar'],
    ['pi pi-instagram', 'https://www.instagram.com/manoj_malviya_/', 'instagram'],
    ['pi pi-youtube', 'https://www.youtube.com/@manoj_malviya', 'youtube'],
    ['pi pi-apple', 'https://music.apple.com/us/artist/manoj-malviya/1721435458', 'apple music'],
    ['fa-brands fa-soundcloud', 'https://soundcloud.com/manoj-malviya-96', 'soundcloud'],
];

const IntroOverlay = () => {
    const socialMediaItems = rangesTo(socialMediaLinkIconAndTooltip, ([icon, link, tooltip]) => {
        return createButtonGroupItem({
            icon: icon,
            tooltip: tooltip,
            onClick: () => openLink(link),
        });
    });
    return (
        <div className="absolute left-8 top-1/3">
            <p className="text-lg text-black mb-1">
                Manoj Malviya
            </p>
            <h1 className="text-4xl text-primary font-bold mb-4">SOFTWARE ENGINEER</h1>
            <AtomButtonGroup items={socialMediaItems}/>
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
        />
    );
};

export default Intro;
