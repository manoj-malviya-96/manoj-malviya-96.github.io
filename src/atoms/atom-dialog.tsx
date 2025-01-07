import React, {forwardRef} from "react";
import {AtomButton, AtomButtonProps, ButtonSize, ButtonType} from "./atom-button";
import {AtomTitleText} from "./atom-text";
import {useDialog} from "../providers/dialogs";

export interface AtomDialogProps {
	visible?: boolean;
	title?: string;
	content?: React.ReactNode;
	closeCallback?: () => void;
}

const AtomDialog = forwardRef<HTMLDivElement, AtomDialogProps>(
	({title, content, visible = false, closeCallback}, ref) => {
		return (
			<>
				{/* Background overlay */}
				<div className={`fixed inset-0 w-full h-full z-20 backdrop-brightness-75
                                bg-transparent ${visible ? "block" : "hidden"}`}/>
				{/* Dialog */}
				<div
					ref={ref}
					tabIndex={-1}
					className={`fixed left-0 bottom-0 w-full h-fit z-20
                            flex flex-col justify-center items-center p-8
                            backdrop-blur-md bg-primary bg-opacity-50
                            border-primary border rounded-t-lg
                            transition-transform duration-500 ${
						visible
							? "translate-y-0 opacity-100"
							: "translate-y-full opacity-0 pointer-events-none"
					}`}
					role="dialog"
				>
					<div className="absolute top-4 right-4">
						<AtomButton icon="fas fa-xmark"
						            size={ButtonSize.Large}
						            type={ButtonType.Ghost}
						            onClick={closeCallback}/>
					</div>
					<div className="flex flex-col justify-center items-center p-4">
						<AtomTitleText
							
							className="text-primary-content text-2xl font-bold text-center"
						>{title ? title : "Dialog"}</AtomTitleText>
						<div className="mt-4">{content}</div>
					</div>
				</div>
			</>
		);
	}
);

AtomDialog.displayName = "AtomDialog";

export default React.memo(AtomDialog);

interface ModalButtonProps extends AtomButtonProps {
	title: string;
	dialogContent: React.ReactNode;
}

export const DialogButton: React.FC<ModalButtonProps> = React.memo(({
	                                                                    label,
	                                                                    icon,
	                                                                    className,
	                                                                    disabled,
	                                                                    title,
	                                                                    dialogContent,
	                                                                    ...atomButtonProps
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
});

