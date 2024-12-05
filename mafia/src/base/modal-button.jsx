import PrimaryButton from "./primary-button";
import Dialog from "./dialog";
import {ButtonOptions} from "../utils/enums";


const ModalButton = ({
                         label, icon, className, disabled, title, dialogContent, dialogAction
                     }) => {
    const id = crypto.randomUUID();
    return (
        <>
            <PrimaryButton
                label={label}
                icon={icon}
                style={ButtonOptions.Style.Ghost}
                onClick={() => document.getElementById(id).showModal()}
                className={className}
                disabled={disabled}
            />
            <Dialog id={id} title={title} content={dialogContent}/>
        </>
    );

}

export default ModalButton;