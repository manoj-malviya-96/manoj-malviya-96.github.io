import React from 'react';
import Timeline from "../base/timeline";
import FullScreenPage from "../base/full-page";

const timelineData = [
    {
        id: 0,
        title: 'Present Day',
        date: '2024',
        image: 'https://img.daisyui.com/images/stock/photo-1635805737707-575885ab0820.webp',
        link: '/journey/present',
        icon: 'fa fa-star', // Font Awesome icon
    },
    {
        id: 1,
        title: 'Joined My Dream Company',
        date: '2020',
        image: 'https://img.daisyui.com/images/stock/photo-1635805737707-575885ab0820.webp',
        link: '/journey/2020',
        icon: 'fa fa-check-circle', // Font Awesome icon
    },
    {
        id: 2,
        title: 'First Project',
        date: '2017',
        image: 'https://img.daisyui.com/images/stock/photo-1635805737707-575885ab0820.webp',
        link: '/journey/2017',
        icon: 'fa fa-check-circle', // Font Awesome icon
    },
    {
        id: 3,
        title: 'Started My Journey',
        date: '2015',
        link: '/journey/2015',
        icon: 'fa fa-check-circle', // Font Awesome icon
    },
    {
        id: 4,
        title: 'Started My Journey',
        date: '2015',
        link: '/journey/2015',
        icon: 'fa fa-check-circle', // Font Awesome icon
    },
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
