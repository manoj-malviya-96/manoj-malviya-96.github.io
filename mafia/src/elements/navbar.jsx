import React from 'react';
import TabBar from "../base/tabs-bar";
import ThemeButton from "./theme";

const Navbar = () => {
    const tabs = [
        {name: 'intro', label: 'Home', icon: 'fa fa-home'},
        {name: 'career', label: 'Career', icon: 'fa fa-briefcase'},
        {name: 'tools', label: 'Tools', icon: 'bi bi-app-indicator'},
        {name: 'blog', label: 'Blog', icon: 'fa fa-book'},
    ];

    return (
        <div
            className="navbar bg-base-100 bg-opacity-50
                    backdrop-blur-md fixed top-0 h-fit w-full z-20 overflow-x-hidden"
        >
            {/* Left: TabBar */}
            <div className="flex-1 overflow-x-auto">
                <TabBar tabs={tabs}/>
            </div>
            {/* Right: Theme Manager */}
            <div className="flex-none">
                <ThemeButton/>
            </div>
        </div>
    );
};

export default Navbar;
