import React from "react";
import {ScreenSizeProvider} from "../providers/screen";
import KeyboardShortcutProvider from "../providers/keyboard";
import {NavbarProvider} from "../providers/navbar";
import {ThemeProvider} from "../providers/theme";
import ToastProvider from "../providers/toasts";
import {FirebaseProvider} from "../providers/firebase";

const AllProviders: React.FC<{ children: React.ReactNode }> = ({children}) => {
	return (
		<FirebaseProvider>
			<ThemeProvider>
				<ScreenSizeProvider>
					<KeyboardShortcutProvider>
						<NavbarProvider>
							<ToastProvider>
								{children}
							</ToastProvider>
						</NavbarProvider>
					</KeyboardShortcutProvider>
				</ScreenSizeProvider>
			</ThemeProvider>
		</FirebaseProvider>
	);
};
export default AllProviders;
