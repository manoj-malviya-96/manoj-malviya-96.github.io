import React from 'react';
import {NavbarProvider} from "./providers/navbar";
import RouterConstructor from "./providers/router";
import constructedRoutes from "./main/routes";
import {ScreenSizeProvider} from "./providers/screen";
import {ThemeProvider} from "./providers/theme";
import {init as initAnalytics} from "./main/analytics";
import ToastProvider from "./providers/toast-provider";

const App = () => {
    initAnalytics();
    return (
        <ThemeProvider>
            <ToastProvider>
                <ScreenSizeProvider>
                    <NavbarProvider>
                        <RouterConstructor routes={constructedRoutes}/>
                    </NavbarProvider>
                </ScreenSizeProvider>
            </ToastProvider>
        </ThemeProvider>
    );
};

export default App;
