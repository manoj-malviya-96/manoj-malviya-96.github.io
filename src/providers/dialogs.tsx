import React, {createContext, useContext, useState, ReactNode, useEffect, useRef} from "react";
import AtomDialog, {AtomDialogProps} from "../atoms/atom-dialog";

interface DialogContextType {
    addDialog: (dialog: AtomDialogProps | null) => void;
}

const DialogContext = createContext<DialogContextType | undefined>(undefined);

export const useDialog = (): DialogContextType => {
    const context = useContext(DialogContext);
    if (!context) {
        throw new Error("useDialog must be used within a DialogProvider");
    }
    return context;
};

const DialogProvider: React.FC<{ children: ReactNode }> = ({children}) => {
    const [dialog, setDialog] = useState<AtomDialogProps | null>(null);
    const [showDialog, setShowDialog] = useState(false);
    const dialogRef = useRef<HTMLDivElement | null>(null);
    
    const addDialog = (dialog: AtomDialogProps | null) => {
        if (dialog) {
            setDialog(dialog);
            setShowDialog(true);
        }
    };
    
    const closeDialog = () => {
        setShowDialog(false);
        setTimeout(() => setDialog(null), 300); // Matches CSS animation duration
    };
    
    useEffect(() => {
        if (showDialog && dialogRef.current) {
            dialogRef.current.focus(); // Automatically focus the dialog
        }
        
        const handleKeyDown = (event: KeyboardEvent) => {
            event.stopPropagation();
            event.preventDefault();
            if (event.key === "Escape") {
                closeDialog();
            }
        };
        
        if (showDialog) {
            document.addEventListener("keydown", handleKeyDown);
            return () => {
                document.removeEventListener("keydown", handleKeyDown);
            };
        }
    }, [showDialog]);
    
    return (
        <DialogContext.Provider value={{addDialog}}>
            {children}
            {dialog && (
                <AtomDialog
                    {...dialog}
                    visible={showDialog}
                    closeCallback={closeDialog}
                    ref={dialogRef}
                />
            )}
        </DialogContext.Provider>
    );
};

export default DialogProvider;
