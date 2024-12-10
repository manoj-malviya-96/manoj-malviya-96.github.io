import React, {useCallback, useEffect, useState} from "react";
import {AtomButton, AtomButtonProps} from "./atom-button";
import AtomDialog, {AtomDialogProps} from "./atom-dialog";

interface ModalButtonProps extends AtomButtonProps {
    title: string;
    dialogContent: React.ReactNode;
    footerButtons?: Array<AtomButtonProps>;
    addOkButton?: boolean;
}

const ModalButton: React.FC<ModalButtonProps> = ({
                                                     label,
                                                     icon,
                                                     className,
                                                     disabled,
                                                     title,
                                                     dialogContent,
                                                     footerButtons = [],
                                                     addOkButton = false,
                                                     ...atomButtonProps // Capture any additional AtomButton props
                                                 }) => {
    const [visible, setVisible] = useState(false);
    const showDialog = useCallback(() => {
        setVisible(true);
    }, [setVisible]);
    
    const hideDialog = useCallback(() => {
        setVisible(false);
    }, [setVisible]);
    
    if (addOkButton) {
        footerButtons?.push({
            label: "OK",
            icon: "fa fa-check",
            onClick: hideDialog,
        });
    }
    
    return (
        <>
            <AtomButton
                {...atomButtonProps} // Spread AtomButton props
                label={label}
                icon={icon}
                ghost={true}
                onClick={showDialog}
                className={className}
                disabled={disabled}
            />
            <AtomDialog visible={visible}
                        title={title}
                        modal={true}
                        onHide={hideDialog}
                        content={dialogContent}
                        footerButtons={footerButtons}/>
        </>
    );
};

export default ModalButton;
