import React from "react";
import { ScreenSizeProvider } from "../providers/screen";
import KeyboardShortcutProvider from "../providers/keyboard";
import { NavbarProvider } from "../providers/navbar";
import { ThemeProvider } from "../providers/theme";
import ToastProvider from "../providers/toasts";
import ImageProvider from "../providers/image";

const AllProviders: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <ThemeProvider>
      <ScreenSizeProvider>
        <KeyboardShortcutProvider>
          <NavbarProvider>
            <ImageProvider>
              <ToastProvider>{children}</ToastProvider>
            </ImageProvider>
          </NavbarProvider>
        </KeyboardShortcutProvider>
      </ScreenSizeProvider>
    </ThemeProvider>
  );
};
export default AllProviders;
