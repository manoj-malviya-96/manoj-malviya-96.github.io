import React, {useState} from "react";
import {AtomButton, AtomButtonProps} from "./atom-button";
import AtomDialog from "./atom-dialog";

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
                                                     addOkButton = false,
                                                     ...atomButtonProps // Capture any additional AtomButton props
                                                 }) => {
    
    
    const [isOpen, setIsOpen] = useState(false);
    
    
    return (
        <>
            <AtomButton
                {...atomButtonProps} // Spread AtomButton props
                label={label}
                icon={icon}
                onClick={() => setIsOpen(!isOpen)}
                className={className}
                disabled={disabled}
            />
            <AtomDialog
                title={title}
                visible={isOpen}
                content={dialogContent}
                closeCallback={() => setIsOpen(false)}
            />
        </>
    );
};

export default ModalButton;
