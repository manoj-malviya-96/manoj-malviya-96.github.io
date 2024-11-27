import React from 'react';
import profilePicture from './assets/main.jpg';
import FullScreenPage from "../base/full-page";
import GridButtons from "../base/grid-buttons";
import {createGridButtonItem, rangesTo} from "../utils/types";
import {openLink} from "../utils/links";
import {ButtonOptions} from "../utils/enums";


const socialMediaLinkAndIconPairs = [
    ['bi bi-linkedin', 'https://www.linkedin.com/in/manoj-malviya-44700aa4/'],
    ['bi bi-github', 'https://github.com/manoj-malviya-96'],
    ['bi bi-google', 'https://scholar.google.com/citations?user=0oMXOy0AAAAJ&hl=en&authuser=2'],
    ['bi bi-instagram', 'https://www.instagram.com/manoj_malviya_/'],
    ['bi bi-youtube', 'https://www.youtube.com/@manoj_malviya'],
    ['bi bi-spotify', 'https://open.spotify.com/artist/2oq6u1YZ7biOF4NOPwDp8o?si=ijyL-yRWQqGWqdGIr7Irfg&utm_medium=share&utm_source=linktree&nd=1&dlsi=1234682c3e064aaf'],
    ['bi bi-apple', 'https://music.apple.com/us/artist/manoj-malviya/1721435458'],
    ['fa-brands fa-soundcloud','https://soundcloud.com/manoj-malviya-96']
];

const IntroOverlay = () => {
    const socialMediaItems = rangesTo(socialMediaLinkAndIconPairs, ([icon, link])=>{
        return createGridButtonItem({
            label: '',
            icon: icon,
            size: ButtonOptions.Size.Square,
            style: ButtonOptions.Style.Ghost,
            onClickFunc: ()=>openLink(link),
        })
    });
    return (
        <div className="w-1/4 md:w-1/4 text-left">
            <p className="text-lg text-primary mb-4 px-4">
                Manoj Malviya
            </p>
            <h1 className="text-4xl font-bold mb-4 px-4 text-black">SOFTWARE ENGINEER</h1>
            <GridButtons items={socialMediaItems} className={'text-black'}/>
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
            childrenAlignment='items-center justify-flex-start'
        />
    );
};

export default Intro;
