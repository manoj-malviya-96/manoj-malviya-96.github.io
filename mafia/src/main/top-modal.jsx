import TabBar from "../base/tab-bar";
import React from "react";


export const TopTabBar = ({tabs}) => {
    return (<div className='flex-column p-4
                            rounded-2xl fixed top-0 w-fit h-fit z-20'>
        <TabBar tabs={tabs} className='bg-opacity-75 bg-primary rounded-full backdrop-blur-lg'/>
    </div>)
}

export const TopBrandLogo = ({logo, name}) => {
    return (<div className='flex flex-column py-2 px-4 gap-2 fixed top-0 left-0 w-fit z-20 backdrop-blur'>
        <img src={logo} alt={name} className='w-12 h-12'/>
        <h1 className='text-2xl font-bold text-center m-auto'>{name}</h1>
    </div>)
}
