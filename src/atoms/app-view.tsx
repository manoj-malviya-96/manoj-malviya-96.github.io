import FullScreenPage from "./full-page";
import {TopBrandLogo} from "./top-modal";
import Logo from "../main/tools/logos/muviz.svg";
import React from "react";


interface AppViewProps {
    name: string;
    logo: string;
    children: React.ReactNode;
}

const AppView: React.FC<AppViewProps> = ({name, logo, children}) => {
    return (
        <FullScreenPage
            name={name.toLowerCase()}
            title=""
            children={
                <div className="w-full h-fit">
                    <TopBrandLogo logo={logo} name={name}/>
                    {children}
                </div>
            }
        />
    );
}

export default AppView;