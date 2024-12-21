import React  from "react";
import {AtomButton, AtomButtonProps} from "./atom-button";
import {useDialog} from "../providers/dialogs";

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
    
    
    const {addDialog} = useDialog();
    return (
        <AtomButton
            {...atomButtonProps} // Spread AtomButton props
            label={label}
            icon={icon}
            onClick={() => addDialog({title, content: dialogContent})}
            className={className}
            disabled={disabled}
        />
    );
};

export default ModalButton;
