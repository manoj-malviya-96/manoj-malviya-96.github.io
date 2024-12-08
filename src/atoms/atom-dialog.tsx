import React from "react";
import {Dialog} from 'primereact/dialog';
import {AtomButton, AtomButtonProps} from "./atom-button";
import {daisyPrimary, getColorFromStyle} from "../common/color-utils";

export interface AtomDialogProps {
    visible: boolean;
    title?: string;
    content?: React.ReactNode;
    footerButtons?: Array<AtomButtonProps>
    modal?: boolean;

    onHide(): void;
}

interface AtomHeaderProps {
    title: string;
}

const AtomHeader: React.FC<AtomHeaderProps> = ({title}) => {
    return (
        <div className={`p-4 bg-transparent rounded-t-lg`}>
            <h2 className="text-2xl font-bold text-center">{title}</h2>
        </div>
    );
}

const AtomDialog: React.FC<AtomDialogProps> = ({
                                                   title,
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

    const dialogPt = {
        root: {
            style: {
                borderColor: daisyPrimary(),
                borderOpacity: 0.25,
                backgroundColor: 'transparent',
                backdropFilter: 'blur(10px)',
            },
        },

        content: {
            style: {
                borderColor: 'transparent',
                backgroundColor: 'transparent',
            }
        },

        header: {
            style: {
                borderColor: 'transparent',
                backgroundColor: 'transparent',
            }
        },
        footer: {
            style: {
                borderColor: 'transparent',
                backgroundColor: 'transparent',
            }
        }
    }

    return (
        <Dialog
            header={header}
            footer={footer}
            visible={visible}
            onHide={onHide}
            closeOnEscape={true}
            modal={modal}
            draggable={true}
            focusOnShow={true}
            pt={dialogPt}
            style={{width: '75vw', backgroundColor: 'transparent'}}
            className="bg-transparent
                backdrop-blur-md backdrop-brightness-75 justify-center items-center
                rounded-lg m-auto border-2 border-primary border-opacity-25"
        >
            {content}
        </Dialog>
    );
}

export default AtomDialog;
