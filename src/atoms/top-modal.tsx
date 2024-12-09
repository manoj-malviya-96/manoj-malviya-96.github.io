import React from "react";
import TabBar, {TabBarProps} from "./tab-bar";


interface TopModalProps {
    children: React.ReactNode;
}

export const TopModal: React.FC<TopModalProps> = ({children}) => {
    return (<div className='flex-column m-0 fixed top-4 left-2 w-fit h-fit z-20'>
        {children}
    </div>)
}


export const TopTabBar: React.FC<TabBarProps> = ({items}) => {
    return (<TopModal children={<TabBar items={items}/>}/>)
}


interface TopBrandLogoProps {
    logo: string,
    name: string,
}

export const TopBrandLogo: React.FC<TopBrandLogoProps> = ({logo, name}) => {
    return (
        <TopModal children={<div className='flex flex-row w-fit gap-2 p-0 m-0'>
            <img src={logo} alt={name} className='w-12 h-12'/>
            <h1 className='text-2xl font-bold text-center text-neutral m-auto'>{name}</h1>
        </div>}/>
    );
}