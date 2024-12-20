import React, {useState, useEffect} from "react";
import {AtomButton, AtomButtonProps} from "./atom-button";

export interface AtomDialogProps {
    visible?: boolean;
    title?: string;
    content?: React.ReactNode;
    neutralMode?: boolean;
    closeCallback?: () => void;
}

const _AtomDialog: React.FC<AtomDialogProps> = ({
                                                    title,
                                                    content,
                                                    visible = false,
                                                    closeCallback = () => {
                                                    },
                                                    neutralMode = false,
                                                }) => {
    
    return (
        <div
            className={`fixed bottom-0 left-0 w-full h-fit z-10 rounded-t-lg
                bg-transparent border-primary border backdrop-blur-md flex flex-col p-8
                transition-transform duration-300 ${visible ? "translate-y-0" : "translate-y-full"}`}
        >
            <div className="absolute top-4 right-4">
                <AtomButton icon="fas fa-xmark" onClick={closeCallback}/>
            </div>
            
            <div className="flex flex-col justify-center items-center p-4">
                <h2 className="text-primary-content text-2xl font-bold text-center">{title}</h2>
                <div className="mt-4">{content}</div>
            </div>
        </div>
    );
};

const AtomDialog = React.memo(_AtomDialog);

export default AtomDialog;
