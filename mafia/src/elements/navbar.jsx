import React, {useEffect} from 'react';
import TabBar from "../base/tabs";
import ThemeManager from "./theme";

const Navbar = () => {
    {/* Sections must use Element with `name` matching the tab `to` */}
    const tabs = [
        {name: 'intro', label: 'Home', icon: 'fa fa-home'},
        {name: 'career', label:'Career', icon: 'fa fa-briefcase'},
        {name: 'apps', label: 'Apps', icon: 'fa fa-th'},
        {name: 'blogs', label: 'Blogs', icon: 'fa fa-book'},
    ];
    return (
        <div
            className="navbar bg-base-100 bg-opacity-50 backdrop-blur-md px-4 fixed top-0 left-0 w-full z-1"
        >
            {/* Left: TabBar */}
            <div className="flex-1">
                <TabBar tabs={tabs}/>
            </div>
            {/* Right: Theme Manager */}
            <div className="flex-none">
                <ThemeManager/>
            </div>
        </div>
    );
};

export default Navbar;
