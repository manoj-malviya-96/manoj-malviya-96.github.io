import FullScreenPage from "../../base/full-page";
import ToolInfo from "./tool-info";
import Logo from './logos/trussopt.svg';
import Cover from './logos/trussopt-cover.svg';
import {TopBrandLogo} from "../top-modal";

const AppName = 'TrussOPT';
const TrussOptView = () => {
    return (
        <FullScreenPage
            name="mesha"
            title=""
            children={
            <>
                <TopBrandLogo logo={Logo} name={AppName} />
            </>
            }
        />
    );
}

class TrussOpt extends ToolInfo {
    constructor() {
        super({
            id: 'truss_opt',
            name: AppName,
            description: 'create, analyze and optimize truss',
            cover: Cover,
            componentConstructor: () => (<TrussOptView/>)
        });
    }
}

// We keep everything private and only expose the instance.

const trussOptInstance = new TrussOpt();
export default trussOptInstance;