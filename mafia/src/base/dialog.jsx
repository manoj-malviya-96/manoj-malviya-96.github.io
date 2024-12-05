import PrimaryButton from "./primary-button";
import {ButtonOptions} from "../utils/enums";

const Dialog = ({id, title, content, primaryLabel = "OK"}) => {
    return (
        <dialog id={id} className="modal w-3/4 h-3/4 bg-transparent backdrop-blur-md backdrop-brightness-75
                rounded-lg m-auto border-2 border-primary border-opacity-25">
            <div className="absolute top-0 left-0 w-full p-4">
                {title && <h2 className="text-center text-2xl uppercase">{title}</h2>}
                <form method="dialog">
                    {/* if there is a button in form, it will close the modal */}
                    <PrimaryButton className="absolute right-2 top-2"
                                   icon={"fa fa-close"}
                                   style={ButtonOptions.Style.Ghost}
                                   size={ButtonOptions.Size.Circle}/>
                </form>
            </div>
            {content &&
                <div className="m-auto">
                {content}
                </div>
            }

            {primaryLabel &&
                <div className="modal-action absolute right-4 bottom-4">
                    <form method="dialog">
                        {/* if there is a button, it will close the modal */}
                        <PrimaryButton label={primaryLabel} className="m-auto"/>
                    </form>
                </div>
            }
        </dialog>
    );
}

export default Dialog;