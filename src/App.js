import React from 'react';
import {NavbarProvider} from "./providers/navbar";
import RouterConstructor from "./providers/router";
import constructedRoutes from "./main/routes";
import {ScreenSizeProvider} from "./providers/screen";
import {ThemeProvider} from "./providers/theme";
import {init as initAnalytics} from "./main/analytics";
import {ToastProvider} from "./providers/toasts";
import DialogProvider from "./providers/dialogs";
import {KeyboardShortcutProvider} from "./providers/keyboard";

const App = () => {
    initAnalytics();
    return (
        <ThemeProvider>
            <ScreenSizeProvider>
                <KeyboardShortcutProvider>
                    <NavbarProvider>
                        <ToastProvider>
                            <DialogProvider>
                                <RouterConstructor routes={constructedRoutes}/>
                            </DialogProvider>
                        </ToastProvider>
                    </NavbarProvider>
                </KeyboardShortcutProvider>
            </ScreenSizeProvider>
        </ThemeProvider>
    );
};

export default App;
