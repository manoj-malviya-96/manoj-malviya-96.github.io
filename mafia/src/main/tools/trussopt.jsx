import FullScreenPage from "../../base/full-page";
import ToolInfo from "./tool-info";
import Logo from './logos/trussopt.svg';
import Cover from './logos/trussopt-cover.svg';
import {TopBrandLogo} from "../top-modal";
import {SizeOptions} from "../../utils/enums";


const TrussOptView = () => {
    return (
        <FullScreenPage
            name="mesha"
            title=""
            children={
            <>
                <TopBrandLogo logo={Logo} name='TrussOPT'  />
            </>
            }
        />
    );
}

class TrussOpt extends ToolInfo {
    constructor() {
        super({
            id: 'truss_opt',
            name: 'TrussOpt',
            description: 'create, analyze and optimize truss',
            cover: Cover,
            componentConstructor: () => (<TrussOptView/>)
        });
    }
}

// We keep everything private and only expose the instance.

const trussOptInstance = new TrussOpt;
export default trussOptInstance;