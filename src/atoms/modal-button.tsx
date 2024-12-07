import React, {useState} from "react";
import {AtomButton, AtomButtonProps} from "./atom-button";
import AtomDialog, {AtomDialogProps} from "./atom-dialog"; // Assuming you have a Dialog component

interface ModalButtonProps extends AtomButtonProps {
    title: string;
    dialogContent: React.ReactNode;
    footerButtons?: Array<AtomButtonProps>;
}

const ModalButton: React.FC<ModalButtonProps> = ({
                                                     label,
                                                     icon,
                                                     className,
                                                     disabled,
                                                     title,
                                                     dialogContent,
                                                     footerButtons,
                                                     ...atomButtonProps // Capture any additional AtomButton props
                                                 }) => {
    const [visible, setVisible] = useState(false);
    const [position, setPosition] = useState<AtomDialogProps["position"]>("center");

    const showDialog = (position: AtomDialogProps["position"]) => {
        setPosition(position);
        setVisible(true);
    };

    //<Button label="Top" icon="pi pi-arrow-down" onClick={() => show('top')} className="p-button-warning" style={{ minWidth: '10rem' }} />

    return (
        <>
            <AtomButton
                {...atomButtonProps} // Spread AtomButton props
                label={label}
                icon={icon}
                ghostMode={true}
                onClick={() => showDialog('top')}
                className={className}
                disabled={disabled}
            />
            <AtomDialog visible={visible} title={title} position={position}
                        onHide={() => setVisible(false)}
                        content={dialogContent} footerButtons={footerButtons}/>
        </>
    );
};

export default ModalButton;
