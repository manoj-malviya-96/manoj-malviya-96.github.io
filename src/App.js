import React from 'react';
import NavBar, {NavbarProvider} from "./main/navbar";
import RouterConstructor from "./common/router";
import constructedRoutes from "./main/routes";
import {ScreenSizeProvider} from "./common/screen";
import {ThemeProvider} from "./common/theme";

const App = () => {
    return (
        <ThemeProvider>
            <ScreenSizeProvider>
                <NavbarProvider>
                    <RouterConstructor routes={constructedRoutes}/>
                </NavbarProvider>
            </ScreenSizeProvider>
        </ThemeProvider>
    );
};

export default App;
