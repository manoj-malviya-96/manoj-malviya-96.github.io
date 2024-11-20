import React, {useEffect} from 'react';
import TabBar from "../base/tabs";
import ThemeManager from "./theme";

const Navbar = () => {
    const tabs = [
        { name: 'intro', label: 'Home', icon: 'fa fa-home' },
        { name: 'career', label: 'Career', icon: 'fa fa-briefcase' },
        { name: 'apps', label: 'Apps', icon: 'fa fa-th' },
        { name: 'blogs', label: 'Blogs', icon: 'fa fa-book' },
    ];

    return (
        <div
            className="navbar bg-base-100 bg-opacity-75 backdrop-blur-md fixed top-0 left-0 w-screen z-20 overflow-x-hidden"
        >
            {/* Left: TabBar */}
            <div className="flex-1 overflow-x-auto">
                <TabBar tabs={tabs} />
            </div>
            {/* Right: Theme Manager */}
            <div className="flex-none">
                <ThemeManager />
            </div>
        </div>
    );
};

export default Navbar;
