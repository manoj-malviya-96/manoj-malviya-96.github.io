import React from "react";
import {ScreenSizeProvider} from "../providers/screen";
import KeyboardShortcutProvider from "../providers/keyboard";
import {NavbarProvider} from "../providers/navbar";
import {ThemeProvider} from "../providers/theme";
import ToastProvider from "../providers/toasts";
import DialogProvider from "../providers/dialogs";

const AllProviders: React.FC<{ children: React.ReactNode }> = ({children}) => {
    return (
        <ThemeProvider>
            <ScreenSizeProvider>
                <KeyboardShortcutProvider>
                    <NavbarProvider>
                        <ToastProvider>
                            <DialogProvider>{children}</DialogProvider>
                        </ToastProvider>
                    </NavbarProvider>
                </KeyboardShortcutProvider>
            </ScreenSizeProvider>
        </ThemeProvider>
    );
};
export default AllProviders;
