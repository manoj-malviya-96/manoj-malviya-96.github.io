import React, {createContext, useContext, useState, ReactNode, useEffect, useRef} from "react";
import AtomDialog, {AtomDialogProps} from "../atoms/atom-dialog";
import {useKeyboardManager} from "./keyboard";

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

const _DialogProvider: React.FC<{ children: ReactNode }> = ({children}) => {
    const {addShortcut, removeShortcut} = useKeyboardManager();
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
        setTimeout(() => setDialog(null), 300);
    };
    
    useEffect(() => {
        if (showDialog && dialogRef.current) {
            dialogRef.current.focus();
        }
        
        if (showDialog) {
            addShortcut("Escape", closeDialog);
            return () => {
                removeShortcut("Escape");
            };
        }
    }, [showDialog, addShortcut, removeShortcut]);
    
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
const DialogProvider = React.memo(_DialogProvider);
export default DialogProvider;
