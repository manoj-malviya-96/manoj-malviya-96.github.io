import React from 'react'
import Intro from "./intro";
import Career from "./career";
import BlogListing from "./blogs";
import Tools from "./tools";
import {createTabItem} from "../utils/types";
import {TopTabBar} from "./top-modal";


const Home = () => {
    const tabs = [
        // createTabItem({name: 'intro', label: 'Intro', icon: ''}),
        createTabItem({name: 'tools', label: 'Tools', icon: 'bi bi-app-indicator'}),
        createTabItem({name: 'blog', label: 'Blog', icon: 'fas fa-bars-staggered'}),
        createTabItem({name: 'career', label: 'About Me', icon: 'fas fa-person-through-window'}),
    ]
    return (
        <div className='flex-row w-fit h-fit'>
            <Intro/>
            <Tools/>
            <BlogListing/>
            <Career/>
            <TopTabBar tabs={tabs}/>
        </div>
    )
}

export default Home