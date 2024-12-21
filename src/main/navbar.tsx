import React from 'react';
import {useTheme} from "../providers/theme";
import {AtomButton} from "../atoms/atom-button";
import {useNavigate} from "react-router-dom";
import AtomToolbar from "../atoms/atom-toolbar";
import WebsiteLogo from "./assets/logo.svg";
import AtomSvg from "../atoms/atom-svg";


interface NavbarContextType {
    logo: string;
    setLogo: (value: string) => void;
    name: string;
    setName: (value: string) => void;
}

const NavbarContext = React.createContext<NavbarContextType | undefined>(undefined);

export const useNavbar = (): NavbarContextType => {
    const context = React.useContext(NavbarContext);
    if (!context) {
        throw new Error('useNavbar must be used within a NavbarProvider');
    }
    return context;
}

export const NavbarProvider: React.FC<{
    children: React.ReactNode
}> = ({children}) => {
    const [logo, setLogo] = React.useState(WebsiteLogo);
    const [name, setName] = React.useState('MAFIA');
    return (
        <NavbarContext.Provider
            value={{logo, setLogo, name, setName}}>
            {children}
        </NavbarContext.Provider>
    )
}


const Navbar = () => {
    const navigate = useNavigate();
    const {logo, name} = useNavbar();
    const {
        currentTheme,
        currentThemeDetails,
        cycleTheme,
        themeEnabled
    } = useTheme();
    return (
        <AtomToolbar
            className={'z-20'}
            start={(
                <div className='flex flex-row w-fit h-fit justify-center items-center
                        backdrop-blur-md gap-2 px-4 py-2 m-0
                        bg-primary bg-opacity-80 rounded-full '>
                    <AtomSvg src={logo} alt={name}
                             className='w-6 h-6'/>
                    <h1 className='text-lg font-bold text-center m-auto'>{name}</h1>
                </div>
            )}
            end={(
                <div className='flex flex-row gap-2'>
                    <AtomButton
                        label="Home"
                        icon="pi pi-home"
                        onClick={() => navigate("/")}
                    />
                    <AtomButton
                        icon={currentThemeDetails.icon}
                        label={currentTheme}
                        onClick={cycleTheme}
                        disabled={!themeEnabled}
                    />
                </div>
            )
            }
        />
    );
};

export default Navbar;
