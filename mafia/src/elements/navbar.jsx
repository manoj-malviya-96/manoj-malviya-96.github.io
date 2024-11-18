import React from 'react';
import TabBar from "../base/tabs";
import ThemeManager from "./theme";

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
        <div
            className="navbar bg-base-100 bg-opacity-50 backdrop-blur-md px-4 fixed top-0 left-0 w-full z-50"
            style={{
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', // Optional shadow for depth
            }}
        >
            {/* Left: TabBar */}
            <div className="flex-1">
                <TabBar tabs={tabs} onTabChange={handleTabChange}/>
            </div>

            {/* Right: Theme Manager */}
            <div className="flex-none">
                <ThemeManager/>
            </div>
        </div>
    );
};

export default Navbar;
