import React from 'react';
import AtomTimeline from "../atoms/atom-timeline";
import FullScreenPage from "../atoms/full-page";
import GithubProfile from "./github";
import {jobRelatedBlogs} from "./blogs/blog-registry";
import {rangesTo} from "../common/types";

const AboutMe = () => {
    const timelineData = rangesTo(jobRelatedBlogs, (blog) => {
        return blog.timelineItem()
    });
    return (
        <FullScreenPage
            name="about-me"
            title="About me"
            children={
                <div className="flex flex-col md:flex-row w-full h-fit gap-8">
                    <div className="md:w-1/2 w-full h-full">
                        <AtomTimeline items={timelineData}/>
                    </div>
                    <div className="md:w-1/2 w-full h-fit">
                        <GithubProfile/>
                    </div>
                </div>
            }
        />
    );
};

export default AboutMe;
