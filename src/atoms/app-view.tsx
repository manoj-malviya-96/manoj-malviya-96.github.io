import FullScreenPage from "./full-page";
import React from "react";
import {useNavbar} from "../main/navbar";


interface AppViewProps {
    appName: string;
    appLogo: string;
    children: React.ReactNode;
}

const AppView: React.FC<AppViewProps> = ({appName, appLogo, children}) => {
    const {setLogo, setName} = useNavbar();
    setLogo(appLogo);
    setName(appName);
    return (
        <FullScreenPage
            name={appName.toLowerCase()}
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