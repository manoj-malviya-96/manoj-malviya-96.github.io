import React from "react";
import {AtomButton} from "./atom-button";

export interface AtomDialogProps {
    visible?: boolean;
    title?: string;
    content?: React.ReactNode;
    neutralMode?: boolean;
    closeCallback?: () => void;
    position?: { x: number; y: number }; // Add screen coordinates
}

const _AtomDialog: React.FC<AtomDialogProps> = ({
                                                    title,
                                                    content,
                                                    visible = false,
                                                    closeCallback = () => {
                                                    },
                                                }) => {
    return (
        <dialog
            className={`modal absolute z-10 rounded-lg bg-transparent border-primary border
                backdrop-blur-md flex flex-col p-8 transition-transform duration-300
                ${visible ? "opacity-100 scale-100" : "opacity-0 scale-95 pointer-events-none"}`}
        >
            <div className="absolute top-4 right-4">
                <AtomButton icon="fas fa-xmark" onClick={closeCallback}/>
            </div>
            
            <div className="flex flex-col justify-center items-center p-4">
                <h2 className="text-primary-content text-2xl font-bold text-center">{title}</h2>
                <div className="mt-4">{content}</div>
            </div>
        </dialog>
    );
};

const AtomDialog = React.memo(_AtomDialog);

export default AtomDialog;
