import React from 'react';
import AtomTimeline from "../atoms/atom-timeline";
import FullScreenPage from "../atoms/full-page";
import GithubProfile from "./github";
import {jobRelatedBlogs} from "./blogs/blog-registry";
import {rangesTo} from "../common/math";
import {openLink} from "../common/links";
import {AtomButtonProps} from "../atoms/atom-button";
import AtomButtonGroup from "../atoms/atom-button-group";
import {useNavigate} from "react-router-dom";

type SocialMediaLink = [icon: string, link: string, tooltip: string];
const MySocialMediaLinks: Array<SocialMediaLink> = [
    ['fa-brands fa-linkedin', 'https://www.linkedin.com/in/manoj-malviya-44700aa4/', 'linkedin'],
    ['fa-brands fa-github', 'https://github.com/manoj-malviya-96', 'github'],
    [
        'fa-brands fa-google', 'https://scholar.google.com/citations?user=0oMXOy0AAAAJ&hl=en&authuser=2',
        'google scholar'
    ],
    ['fa-brands fa-instagram', 'https://www.instagram.com/manoj_malviya_/', 'instagram'],
    ['fa-brands fa-youtube', 'https://www.youtube.com/@manoj_malviya', 'youtube'],
    ['fa-brands fa-apple', 'https://music.apple.com/us/artist/manoj-malviya/1721435458', 'apple music'],
    ['fa-brands fa-soundcloud', 'https://soundcloud.com/manoj-malviya-96', 'soundcloud'],
];
const socialMediaItems = rangesTo(
    MySocialMediaLinks, (smLink: SocialMediaLink) => {
        return {
            icon: smLink[0],
            onClick: () => openLink(smLink[1], null),
            tooltip: smLink[2],
        } as AtomButtonProps;
    });

const AboutMe = () => {
    const navigate = useNavigate();
    const timelineData = rangesTo(jobRelatedBlogs, (blog) => {
        return {
            image: blog.cover,
            title: blog.title,
            date: blog.date,
            description: blog.description,
            onClick: () => navigate(blog.path),
        };
    });
    return (
        <FullScreenPage
            name="about-me"
            title="About me"
            children={
                <div
                    className="flex flex-col w-full h-fit gap-4 justify-center items-center">
                    <span className="w-fit lg:w-1/2">Hi there! I’m
                        <strong> Manoj Malviya</strong>,
                        a Software Engineer who loves solving tricky
                        problems with elegant solutions and introduce creativity and artistic.
                        I use fancy computer tools and methods
                        to turn these problems into real results. I’m a great problem solver
                        who always puts the user first. I’ve led many complex projects and
                        always delivered elegant solutions.</span>
                    <AtomButtonGroup items={socialMediaItems}/>
                    
                    <div
                        className="flex flex-col p-8 w-full h-fit gap-8">
                        <div className="w-full h-1/2">
                            <AtomTimeline items={timelineData} orientation={'horizontal'}/>
                        </div>
                        <div className="w-full h-1/2">
                            <GithubProfile/>
                        </div>
                    </div>
                </div>
            }
        />
    );
};

export default AboutMe;
