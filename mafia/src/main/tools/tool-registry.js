import {createRouterItem, rangesTo} from "../../utils/types";
import muvizInstance from "./muviz";
import meshaInstance from "./mesha";



export const registeredTools = [
    muvizInstance,
    meshaInstance,
]

export const makeToolRouter = () => {
    return rangesTo(registeredTools, (info) => {
        return createRouterItem({path: info.path, component: info.component})
    });
};

