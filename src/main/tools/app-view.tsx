import AtomFullScreenContainer from "../../atoms/atom-full-screen-container";
import React from "react";
import {useNavbar} from "../../providers/navbar";


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
        <AtomFullScreenContainer
            name={appName.toLowerCase()}
            title=""
            children={children}
        />
    );
}

export default AppView;