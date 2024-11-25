import React from 'react'
import Intro from "./intro";
import Career from "./career";
import BlogListing from "./blogs";
import Tools from "./tools";
import {createTabItem} from "../utils/types";
import TabBarOnTop from "./tab-bar-on-top";


const Home = () => {
    const tabs = [
        createTabItem({name: 'intro', label: 'Intro', icon: 'fas fa-info-circle'}),
        createTabItem({name: 'tools', label: 'Tools', icon: 'fas fa-tools'}),
        createTabItem({name: 'blog', label: 'Blog', icon: 'fas fa-bars-staggered'}),
        createTabItem({name: 'career', label: 'About Me', icon: 'fas fa-person-through-window'}),
    ]
    return (
        <div className='flex-row w-fit h-fit'>
            <Intro/>
            <Tools/>
            <BlogListing/>
            <Career/>
            <TabBarOnTop tabs={tabs}/>
        </div>
    )
}

export default Home