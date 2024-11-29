import FullScreenPage from "../../base/full-page";
import ToolInfo from "./tool-info";
import Logo from './logos/mesha.svg';
import Cover from './logos/mesha-cover.svg';
import {TopBrandLogo} from "../top-modal";
import {SizeOptions} from "../../utils/enums";



const MeshaView = () => {
    return (
        <FullScreenPage
            name="mesha"
            title=""
            children={
            <>
                <TopBrandLogo logo={Logo} name='MESHA'  />
            </>
            }
        />
    );
}

class Mesha extends ToolInfo {
    constructor() {
        super({
            id: 'mesha',
            name: 'Mesha',
            description: 'visualize + manipulate mesh',
            cover: Cover,
            componentConstructor: () => (<MeshaView/>)
        });
    }
}

// We keep everything private and only expose the instance.

const meshaInstance = new Mesha;
export default meshaInstance;