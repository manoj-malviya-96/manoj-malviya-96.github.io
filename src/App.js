import React from 'react';
import {NavbarProvider} from "./providers/navbar";
import RouterConstructor from "./providers/router";
import constructedRoutes from "./main/routes";
import {ScreenSizeProvider} from "./providers/screen";
import {ThemeProvider} from "./providers/theme";
import {init as initAnalytics} from "./main/analytics";
import Toasts, {ToastProvider} from "./providers/toasts";
import DialogProvider from "./providers/dialogs";

const App = () => {
    initAnalytics();
    return (
        <ThemeProvider>
            <ScreenSizeProvider>
                <NavbarProvider>
                    <ToastProvider>
                        <DialogProvider>
                            <RouterConstructor routes={constructedRoutes}/>
                        </DialogProvider>
                    </ToastProvider>
                </NavbarProvider>
            </ScreenSizeProvider>
        </ThemeProvider>
    );
};

export default App;
