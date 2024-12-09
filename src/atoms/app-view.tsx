import FullScreenPage from "./full-page";
import React from "react";
import {useNavbar} from "../main/navbar";


interface AppViewProps {
    name: string;
    logo: string;
    children: React.ReactNode;
}

const AppView: React.FC<AppViewProps> = ({name, logo, children}) => {
    const {setLogo, setName} = useNavbar();
    setLogo(logo);
    setName(name);
    return (
        <FullScreenPage
            name={name.toLowerCase()}
            title=""
            children={
                <div className="w-full h-fit">
                    {children}
                </div>
            }
        />
    );
}

export default AppView;