import React, {createContext, ReactNode, useContext, useState} from "react";
import AtomToast, {ToastType, AtomToastItemProps} from "../atoms/atom-toast";

interface ToastContextType {
    addToast: (message: string, type?: ToastType, duration?: number) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const useToast = (): ToastContextType => {
    const context = useContext(ToastContext);
    if (!context) {
        throw new Error("useToast must be used within a ToastManager");
    }
    return context;
};

export const Toasts: React.FC<{ children: ReactNode }> = ({children}) => {
    const [toasts, setToasts] = useState<AtomToastItemProps[]>([]);
    
    const addToast = (message: string, type: ToastType = "info", duration = 2000) => {
        console.log("Adding toast:", message, type); // Debugging
        const id = Date.now();
        setToasts((prev) => {
            const updatedToasts = [...prev, {id, message, type}];
            if (updatedToasts.length > 5) {
                updatedToasts.shift(); // Keep max 5 toasts
            }
            return updatedToasts;
        });
        
        // Remove the toast after some time ...
        setTimeout(() => {
            removeToast(id)
        }, duration);
    };
    
    const removeToast = (id: number) => {
        setToasts((prev) => {
            return prev.filter((toast) => toast.id !== id);
        });
        
    };
    
    return (
        <ToastContext.Provider value={{addToast}}>
            {children}
            <AtomToast toasts={toasts}/>
        </ToastContext.Provider>
    );
};

export default Toasts;
