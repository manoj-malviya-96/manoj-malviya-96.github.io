import React, {createContext, ReactNode, useContext, useState} from "react";

type ToastType = "info" | "success" | "error" | "warning";

const getIcon = (type: ToastType) => {
    switch (type) {
        case "info":
            return "fas fa-light-bulb";
        case "success":
            return "fas fa-thumbs-up";
        case "error":
            return "fas fa-bug";
        case "warning":
            return "fas fa-triangle-exclamation";
    }
}

interface Toast {
    id: number;
    message: string;
    type: ToastType;
}

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

export const ToastManager: React.FC<{ children: ReactNode }> = ({children}) => {
    const [toasts, setToasts] = useState<Toast[]>([]);
    
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
            const updated = prev.filter((toast) => toast.id !== id);
            return updated;
        });
        
    };
    
    return (
        <ToastContext.Provider value={{addToast}}>
            {children}
            <div className="toast toast-top toast-center">
                {toasts.map((toast) => (
                    <div
                        key={toast.id}
                        className={`alert ${'alert-'+ toast.type} rounded-lg p-2 flex flex-row gap-2`}
                    >
                        <i
                            className={`${getIcon(toast.type)} text-small`}
                        />
                        <span className="text-small">
                            {toast.message}
                        </span>
                    </div>
                ))}
            </div>
        </ToastContext.Provider>
    );
};

export default ToastManager;
