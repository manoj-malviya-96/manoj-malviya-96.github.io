import AtomFullScreenContainer from "../../atoms/atom-full-screen-container";
import React, {useEffect} from "react";
import {useNavbar} from "../../providers/navbar";


interface AppViewProps {
    appName: string;
    appLogo: string;
    children: React.ReactNode;
}

const _AppView: React.FC<AppViewProps> = ({appName, appLogo, children}) => {
    const {updateBrand} = useNavbar();
    
    useEffect(() => {
        updateBrand({
            logo: appLogo,
            name: appName,
        });
    }, [appLogo, appName, updateBrand]);
    
    return (
        <AtomFullScreenContainer
            name={appName.toLowerCase()}
            children={children}
        />
    );
}

const AppView = React.memo(_AppView);
export default AppView;