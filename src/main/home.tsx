import React from 'react'
import Intro from "./intro";
import BlogListing from "./blog-list";
import AboutMe from "./about-me";
import {TopTabBar} from "../atoms/top-modal";
import ToolDrawer from "./tool-drawer";


const Home = () => {
    const tabs = [
        {name: 'tools', label: 'ToolList', icon: 'bi bi-app-indicator'},
        {name: 'blog', label: 'Blogs', icon: 'fas fa-bars-staggered'},
        {name: 'about-me', label: 'About Me', icon: 'fas fa-person-through-window'},
    ]
    return (
        <div className='flex-row w-full h-fit'>
            <Intro/>
            <ToolDrawer/>
            <BlogListing/>
            <AboutMe/>
            <TopTabBar items={tabs}/>
        </div>
    )
}

export default Home