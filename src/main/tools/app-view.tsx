import AtomFullScreenContainer from "../../atoms/atom-full-screen-container";
import React from "react";
import {useNavbar} from "../../providers/navbar";


interface AppViewProps {
    appName: string;
    appLogo: string;
    children: React.ReactNode;
}

const _AppView: React.FC<AppViewProps> = ({appName, appLogo, children}) => {
    const {updateBrand} = useNavbar();
    updateBrand({
        logo: appLogo,
        name: appName
    });
    return (
        <AtomFullScreenContainer
            name={appName.toLowerCase()}
            title=""
            children={children}
        />
    );
}

const AppView = React.memo(_AppView);
export default AppView;