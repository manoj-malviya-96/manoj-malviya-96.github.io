import React from "react";
import TabBar, {TabBarProps} from "./tab-bar";


interface TopModalProps {
    children: React.ReactNode;
}

export const TopModal: React.FC<TopModalProps> = ({children}) => {
    return (<div className='flex-column p-4
                            rounded-2xl fixed top-0 w-fit h-fit z-20'>
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
        <TopModal children={<div className='flex-column'>
            <img src={logo} alt={name} className='w-12 h-12'/>
            <h1 className='text-2xl font-bold text-center m-auto'>{name}</h1>
        </div>}/>
    );
}