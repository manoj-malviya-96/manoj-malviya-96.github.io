import TabBar from "../atoms/tab-bar";
import React from "react";


export const TopTabBar = ({tabs}) => {
    return (<div className='flex-column p-4 fixed top-0 w-fit h-fit z-5'>
        <TabBar tabs={tabs} className='bg-primary p-2 border-round-xl backdrop-blur-lg'/>
    </div>)
}

export const TopBrandLogo = ({logo, name}) => {
    return (
        <div className='flex flex-row py-2 px-4 gap-2 fixed top-0 left-0 w-fit z-5'>
            <img src={logo} alt={name} className='w-3em h-3rem'/>
            <h1 className='text-2xl font-bold text-center m-auto'>{name}</h1>
        </div>)
}
