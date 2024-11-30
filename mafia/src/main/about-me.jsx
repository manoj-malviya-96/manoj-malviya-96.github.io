import React from 'react';
import Timeline from "../base/timeline";
import FullScreenPage from "../base/full-page";
import {createTimeLineItem, rangesTo} from "../utils/types";
import GithubProfile from "./tools/github";
import {jobRelatedBlogs} from "./blogs/blog-registry";

const AboutMe = () => {
    const timelineData = rangesTo(jobRelatedBlogs, (blog)=> {return blog.timelineItem()});
    return (
        <FullScreenPage
            name="about-me"
            title="About me"
            children={
                <div className="flex flex-col md:flex-row w-full h-fit gap-8">
                    <div className="md:w-1/2 w-full h-full">
                        <Timeline items={timelineData}/>
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
