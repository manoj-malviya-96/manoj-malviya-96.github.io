import React from 'react';
import {useTheme} from "./theme";
import {AtomButton} from "../atoms/atom-button";
import {useNavigate} from "react-router-dom";
import AtomToolbar from "../atoms/atom-toolbar";
import WebsiteLogo from "../main/assets/logo.svg";
import {AtomThemeSensitiveImage} from "../atoms/atom-image";

interface BrandLogoProps {
    logo: string;
    name: string;
}

interface NavbarContextType {
    brand: BrandLogoProps;
    updateBrand: (newBrand: BrandLogoProps) => void;
}

const NavbarContext = React.createContext<NavbarContextType | undefined>(undefined);

export const useNavbar = (): NavbarContextType => {
    const context = React.useContext(NavbarContext);
    if (!context) {
        throw new Error('useNavbar must be used within a NavbarProvider');
    }
    return context;
}

const _NavbarProvider: React.FC<{
    children: React.ReactNode
}> = ({children}) => {
    const [brand, setBrand] = React.useState<BrandLogoProps>({
        logo: WebsiteLogo,
        name: 'MURPH'
    });
    
    const updateBrand = (newBrand: BrandLogoProps) => {
        if (newBrand.logo !== brand.logo || newBrand.name !== brand.name) {
            setBrand(newBrand);
        }
    }
    return (
        <NavbarContext.Provider
            value={{brand, updateBrand}}>
            {children}
        </NavbarContext.Provider>
    )
}
export const NavbarProvider = React.memo(_NavbarProvider);


const _Navbar = () => {
    const navigate = useNavigate();
    const {brand} = useNavbar();
    const {
        currentTheme,
        currentThemeDetails,
        cycleTheme,
        themeEnabled
    } = useTheme();
    return (
        <AtomToolbar
            className={'z-20 px-4'}
            start={(
                // Brand Logo
                <div className='flex flex-row w-fit h-fit justify-center items-center
                        backdrop-blur-md gap-2 px-4 py-2 m-0
                        bg-primary rounded-full '>
                    <AtomThemeSensitiveImage src={brand.logo} alt={brand.name}
                                             className='w-6 h-6'/>
                    <h1 className='text-lg font-bold text-center m-auto'>{brand.name}</h1>
                </div>
            )}
            end={(
                <div className='flex flex-row gap-2'>
                    <AtomButton
                        label="Home"
                        icon="fas fa-home"
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
const Navbar = React.memo(_Navbar);
export default Navbar;
