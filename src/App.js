import React from 'react';
import {NavbarProvider} from "./main/navbar";
import RouterConstructor from "./common/router";
import constructedRoutes from "./main/routes";
import {ScreenSizeProvider} from "./common/screen";
import {ThemeProvider} from "./common/theme";
import {init as initAnalytics} from "./main/analytics";
import ToastManager from "./common/toast-manager";

const App = () => {
    initAnalytics();
    return (
        <ThemeProvider>
            <ToastManager>
                <ScreenSizeProvider>
                    <NavbarProvider>
                        <RouterConstructor routes={constructedRoutes}/>
                    </NavbarProvider>
                </ScreenSizeProvider>
            </ToastManager>
        </ThemeProvider>
    );
};

export default App;
