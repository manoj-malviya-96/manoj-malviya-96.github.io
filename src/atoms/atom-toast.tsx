import React from "react";


export type ToastType = "info" | "success" | "error" | "warning";

const getIcon = (type: ToastType) => {
    switch (type) {
        case "info":
            return "fas fa-light-bulb";
        case "success":
            return "fas fa-thumbs-up";
        case "error":
            return "fas fa-bug";
        case "warning":
            return "fas fa-triangle-exclamation";
    }
}

export interface AtomToastItemProps {
    id: number;
    message: string;
    type: ToastType;
}

interface AtomToastProps {
    toasts: AtomToastItemProps[];
}

const _AtomToast = ({toasts}: AtomToastProps) => {
    return (
        // mt-12 is for brand logo. Todo can be moved to navbar.
        <div className="toast toast-top toast-start mt-12">
            {toasts.map((toast) => (
                <div
                    key={toast.id}
                    className={`alert alert-${toast.type} rounded-lg p-2`}
                >
                    <i
                        className={`${getIcon(toast.type)} text-small`}
                    />
                    <span className="text-sm">
                            {toast.message}
                    </span>
                </div>
            ))}
        </div>
    )
}
const AtomToast = React.memo(_AtomToast);
export default AtomToast;