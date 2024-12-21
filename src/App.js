import React from 'react';
import {NavbarProvider} from "./providers/navbar";
import RouterConstructor from "./providers/router";
import constructedRoutes from "./main/routes";
import {ScreenSizeProvider} from "./providers/screen";
import {ThemeProvider} from "./providers/theme";
import {init as initAnalytics} from "./main/analytics";
import ToastManager from "./providers/toast-manager";

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
