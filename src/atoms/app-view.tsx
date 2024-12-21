import FullScreenPage from "./full-page";
import React from "react";
import {useNavbar} from "../providers/navbar";


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
            children={children}
        />
    );
}

export default AppView;