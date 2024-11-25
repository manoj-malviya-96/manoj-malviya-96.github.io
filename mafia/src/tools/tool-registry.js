import {createRouterItem, rangesTo} from "../utils/types";
import muvizInstance from "./muviz";



export const registeredTools = [
    muvizInstance
]

export const makeToolRouter = () => {
    return rangesTo(registeredTools, (info) => {
        return createRouterItem({path: info.path, component: info.component})
    });
};

