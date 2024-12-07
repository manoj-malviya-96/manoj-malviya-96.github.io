import {createRouterItem, rangesTo} from "../../utils/types";
import muvizInstance from "./muviz/muviz";
import meshaInstance from "./mesha";
import trussOptInstance from "./trussopt/trussopt";



export const registeredTools = [
    muvizInstance,
    meshaInstance,
    trussOptInstance
]

export const makeToolRouter = () => {
    return rangesTo(registeredTools, (info) => {
        return createRouterItem({path: info.path, component: info.component})
    });
};

