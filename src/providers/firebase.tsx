import {initializeApp} from "firebase/app";
import {getAnalytics} from "firebase/analytics";
import React, {createContext, useContext} from "react";
import {FirebaseApp} from "@firebase/app";
import {Analytics} from "@firebase/analytics"

type FirebaseContextType = {
	app: FirebaseApp;
	analytics?: Analytics;
};

const FirebaseContext = createContext<FirebaseContextType | undefined>(undefined);

export const FirebaseProvider: React.FC<{ children: React.ReactNode }> = ({children}) => {
	const firebaseConfig = {
		apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
		authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
		projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
		storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
		messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
		appId: process.env.REACT_APP_FIREBASE_APP_ID,
		measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID,
	};
	
	
	const app: FirebaseApp = initializeApp(firebaseConfig);
	const analytics = getAnalytics(app);
	
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