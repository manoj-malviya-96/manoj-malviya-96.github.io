import {initializeApp} from "firebase/app";
import {getAnalytics} from "firebase/analytics";
import React, {createContext, useContext} from "react";

const firebaseConfig = {
	apiKey: "AIzaSyA07VY6CuhD3rUuUaAUsUOaIO91t7ak6uM",
	authDomain: "murph-website.firebaseapp.com",
	projectId: "murph-website",
	storageBucket: "murph-website.firebasestorage.app",
	messagingSenderId: "181860870774",
	appId: "1:181860870774:web:fc7b5af0da45041f104d57",
	measurementId: "G-SYFTD3EG9E"
};
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);


type FirebaseContextType = {
	app: typeof app;
	analytics?: typeof analytics;
};

const FirebaseContext = createContext<FirebaseContextType | undefined>(undefined);

export const FirebaseProvider: React.FC<{ children: React.ReactNode }> = ({children}) => {
	return (
		<FirebaseContext.Provider value={{app, analytics}}>
			{children}
		</FirebaseContext.Provider>
	);
};

export const useFirebase = (): FirebaseContextType => {
	const context = useContext(FirebaseContext);
	if (!context) {
		throw new Error("useFirebase must be used within a FirebaseProvider");
	}
	return context;
};