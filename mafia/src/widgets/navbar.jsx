import React from 'react';
import ThemeManager from "./theme";
import TabBar from "../base/tabs";

const Navbar = () => {
    const tabs = [
        {name: 'home', label: 'Home', icon: 'fa fa-home'},
        {name: 'apps', label: 'Apps', icon: 'fa fa-th'},
        {name: 'blogs', label: 'Blogs', icon: 'fa fa-book'},
    ];

    const handleTabChange = (tabName) => {
        switch (tabName) {
            // case 'home':
            //     window.location.href = '/';
            //     break;
            // case 'apps':
            //     window.location.href = '/apps';
            //     break;
            // case 'blogs':
            //     window.location.href = '/blogs';
            //     break;
            // default:
            //     break;
        }
    };

    return (
        <div className="navbar bg-base-100 px-4">
            {/* Left: TabBar */}
            <div className="flex-1">
                <TabBar tabs={tabs} onTabChange={handleTabChange}/>
            </div>

            {/* Right: ThemeCycler */}
            <div className="flex-none">
                <ThemeManager/>
            </div>
        </div>
    );
};

export default Navbar;
