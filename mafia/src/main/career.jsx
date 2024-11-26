import React from 'react';
import Timeline from "../base/timeline";
import FullScreenPage from "../base/full-page";
import {createTimeLineItem} from "../utils/types";

const timelineData = [
    createTimeLineItem({id: 1, title: "Software Engineer", date: "2021 - Present", icon: "bi bi-code-slash"}),
    createTimeLineItem({id: 2, title: "Software Engineer", date: "2019 - 2021", icon: "bi bi-code-slash"}),
    createTimeLineItem({id: 3, title: "Software Engineer", date: "2017 - 2019", icon: "bi bi-code-slash"}),
];

const Career = () => {
    return (
        <FullScreenPage
            name="career"
            title="My Career Journey"
            children={
                <Timeline items={timelineData}/>
            }
        />
    );
};

export default Career;
