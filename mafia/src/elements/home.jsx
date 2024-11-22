import React from 'react'
import Intro from "./intro";
import Career from "./career";
import BlogListing from "./blogs";
import Tools from "./tools";
import TabBar from "../base/tabs-bar";

const Home = () => {
    const tabs = [
        {
            name: 'intro',
            label: 'Intro',
            icon: 'fas fa-signature',
        },
        {
            name: 'career',
            label: 'Career',
            icon: 'fas fa-briefcase',
        },
        {
            name: 'tools',
            label: 'Tools',
            icon: 'fas fa-tools',
        },
        {
            name: 'blog',
            label: 'Blog',
            icon: 'fas fa-blog',
        },
    ]
    return (
        <div className='flex-row w-fit h-fit'>
            <Intro/>
            <Career/>
            <Tools/>
            <BlogListing/>
            {/*match the top margin of the navbar*/}
            <div className='flex-column bg-base-100 bg-opacity-50 backdrop-blur-md m-4
                            rounded-2xl fixed top-0 w-fit h-fit z-20'>
                <TabBar tabs={tabs}/>
            </div>
        </div>
    )
}

export default Home