import React from "react";
import {Dialog, DialogProps} from 'primereact/dialog';
import {AtomButton, AtomButtonProps} from "./atom-button";

export interface AtomDialogProps {
    position?: DialogProps['position']; // Reusing the position type from DialogProps
    title?: string;
    content?: React.ReactNode;
    footerButtons?: Array<AtomButtonProps>
    visible?: boolean;
    modal?: boolean;

    onHide(): void;
}

interface AtomHeaderProps {
    title: string;
}

const AtomHeader: React.FC<AtomHeaderProps> = ({title}) => {
    return (
        <div className={`p-4 bg-transparent bg-opacity-50 rounded-t-lg`}>
            <h2 className="text-2xl font-bold text-center">{title}</h2>
        </div>
    );
}

const AtomDialog: React.FC<AtomDialogProps> = ({
                                                   title,
                                                   position,
                                                   content,
                                                   footerButtons,
                                                   visible,
                                                   modal,
                                                   onHide,
                                               }) => {

    const header = title ? <AtomHeader title={title}/> : undefined;
    const footer = footerButtons ?
        footerButtons.map((props, index) => {
            return <AtomButton key={index} {...props}/>
        }) : undefined;

    return (
        <Dialog
            header={header}
            footer={footer}
            visible={visible}
            position={position}
            modal={modal}
            onHide={onHide}
            className="modal w-3/4 h-3/4 bg-transparent backdrop-blur-md backdrop-brightness-75
                rounded-lg m-auto border-2 border-primary border-opacity-25"
        >
            {content}
        </Dialog>
    );
}

export default AtomDialog;
