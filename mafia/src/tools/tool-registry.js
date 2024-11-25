import {createRouterItem, rangesTo} from "../utils/types";
import ToolInfo from "./tool-info";
import MuvizView from "./muviz-view";


class MuvizInfo extends ToolInfo {
    constructor() {
        super({
            id: 'muviz',
            name: 'muviz',
            description: 'music + stunning visuals',
            iconPng: '',
            componentConstructor: () => (<MuvizView/>)
        });
    }
}


export const tools = [
    MuvizInfo,
]

export const makeToolRouter = () => {
    return rangesTo(tools, (info) => {
        console.log(info);
        const component = info.component;
        console.log(component);
        return createRouterItem({path: info.path, component: component})
    });
};

