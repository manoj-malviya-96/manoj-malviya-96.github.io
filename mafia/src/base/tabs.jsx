import React, { useState } from 'react';

const TabBar = ({ tabs, onTabChange }) => {
    const [activeTab, setActiveTab] = useState(tabs[0].name); // Default to the first tab

    const handleTabClick = (tab) => {
        setActiveTab(tab.name);
        onTabChange(tab.name); // Notify the parent about the tab change
    };

    return (
        <div className="tabs tabs-bordered">
            {tabs.map((tab) => (
                <a
                    key={tab.name}
                    className={`tab tab-bordered ${activeTab === tab.name ? 'tab-active' : ''}`}
                    onClick={() => handleTabClick(tab)}
                >
                    <i className={`${tab.icon} mr-2`}></i>
                    <span className="hidden sm:inline">{tab.label}</span>
                </a>
                ))}
        </div>
    );
};

export default TabBar;
