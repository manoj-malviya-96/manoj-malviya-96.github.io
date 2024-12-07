import FullScreenPage from "../../atoms/full-page";
import ToolInfo from "./tool-info";
import Logo from './logos/mesha.svg';
import Cover from './logos/mesha-cover.svg';
import {TopBrandLogo} from "../top-modal";

const AppName = 'MESHA';

const MeshaView = () => {
    return (
        <FullScreenPage
            name="mesha"
            title=""
            children={
            <>
                <TopBrandLogo logo={Logo} name={AppName}  />
            </>
            }
        />
    );
}

class Mesha extends ToolInfo {
    constructor() {
        super({
            id: 'mesha',
            name: AppName,
            description: 'visualize + manipulate mesh',
            cover: Cover,
            componentConstructor: () => (<MeshaView/>)
        });
    }
}

// We keep everything private and only expose the instance.

const meshaInstance = new Mesha();
export default meshaInstance;