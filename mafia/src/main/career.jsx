import React from 'react';
import Timeline from "../base/timeline";
import FullScreenPage from "../base/full-page";
import {createTimeLineItem} from "../utils/types";
import GithubProfile from "./tools/github";

const timelineData = [
    createTimeLineItem({id: 1, title: "Software Engineer", date: "2021 - Present", icon: "bi bi-code-slash"}),
    createTimeLineItem({id: 2, title: "Software Engineer", date: "2019 - 2021", icon: "bi bi-code-slash"}),
    createTimeLineItem({id: 3, title: "Software Engineer", date: "2017 - 2019", icon: "bi bi-code-slash"}),
];

const Career = () => {
    return (
        <FullScreenPage
            name="career"
            title="About me"
            children={
                <div className="flex flex-col md:flex-row w-full h-fit gap-4">
                    <div className="md:w-1/3 w-full h-full">
                        <Timeline items={timelineData}/>
                    </div>
                    {/* Divider for medium and larger screens */}
                    <div className="hidden md:block w-px bg-secondary bg-opacity-75"></div>
                    <div className="md:w-2/3 w-full h-fit">
                          <GithubProfile/>
                    </div>
                </div>
            }
        />
    );
};

export default Career;
