import React from 'react';
import {NavbarProvider} from "./providers/navbar";
import RouterConstructor from "./providers/router";
import constructedRoutes from "./main/routes";
import {ScreenSizeProvider} from "./providers/screen";
import {ThemeProvider} from "./providers/theme";
import {init as initAnalytics} from "./main/analytics";
import Toasts from "./providers/toasts";

const App = () => {
    initAnalytics();
    return (
        <ThemeProvider>
            <Toasts>
                <ScreenSizeProvider>
                    <NavbarProvider>
                        <RouterConstructor routes={constructedRoutes}/>
                    </NavbarProvider>
                </ScreenSizeProvider>
            </Toasts>
        </ThemeProvider>
    );
};

export default App;
