import React from 'react';
import {useTheme} from "./theme";
import {AtomButton} from "../atoms/atom-button";
import {useNavigate} from "react-router-dom";
import AtomToolbar from "../atoms/atom-toolbar";


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

export const NavbarProvider: React.FC<{ children: React.ReactNode }> = ({children}) => {
    const [logo, setLogo] = React.useState('');
    const [name, setName] = React.useState('');
    return (
        <NavbarContext.Provider value={{logo, setLogo, name, setName}}>
            {children}
        </NavbarContext.Provider>
    )
}


const Navbar = () => {
    const navigate = useNavigate();
    const {logo, name} = useNavbar();
    const {currentTheme, currentThemeDetails, cycleTheme, themeEnabled} = useTheme();
    return (
        <AtomToolbar
            className={'z-20'}
            start={(
                <div className='flex flex-row w-fit gap-2 p-0 m-0'>
                    <img src={logo} alt={name} className='w-12 h-12'/>
                    <h1 className='text-2xl font-bold text-center text-white m-auto'>{name}</h1>
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
