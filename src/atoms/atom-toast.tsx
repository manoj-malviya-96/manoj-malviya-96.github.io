import React from "react";
import {AtomPrimaryText} from "./atom-text";


export enum ToastSeverity {
	Info = "alert-info",
	Success = "alert-success",
	Error = "alert-error",
	Warning = "alert-warning",
}

const getIcon = (type: ToastSeverity) => {
	switch (type) {
		case ToastSeverity.Info:
			return "fas fa-light-bulb";
		case ToastSeverity.Success:
			return "fas fa-thumbs-up";
		case ToastSeverity.Error:
			return "fas fa-bug";
		case ToastSeverity.Warning:
			return "fas fa-triangle-exclamation";
	}
}

export interface AtomToastItemProps {
	id: number;
	message: string;
	type: ToastSeverity;
}

interface AtomToastProps {
	toasts: AtomToastItemProps[];
}

const AtomToast = React.memo(({toasts}: AtomToastProps) => {
	return (
		// mt-12 is for brand logo. Todo can be moved to navbar.
		<div className="toast toast-top toast-start mt-12">
			{toasts.map((toast) => (
				<div
					key={toast.id}
					className={`alert ${toast.type} rounded-lg p-2`}
				>
					<i
						className={`${getIcon(toast.type)} text-sm`}
					/>
					<AtomPrimaryText className="text-sm">{toast.message}</AtomPrimaryText>
				</div>
			))}
		</div>
	)
});
export default AtomToast;