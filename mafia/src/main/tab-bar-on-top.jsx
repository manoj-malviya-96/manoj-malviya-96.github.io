import TabBar from "../base/tab-bar";
import React from "react";


const TabBarOnTop = ({tabs}) => {
    console.log(tabs);
    return (<div className='flex-column p-4
                            rounded-2xl fixed top-0 w-fit h-fit z-20'>
        <TabBar tabs={tabs} className='bg-opacity-50 bg-black rounded-full backdrop-blur-lg'/>
    </div>)
}

export default TabBarOnTop;