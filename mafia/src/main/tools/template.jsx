import FullScreenPage from "../../base/full-page";
import ToolInfo from "./tool-info";
import Logo from './logos/muviz.svg';
import {TopBrandLogo} from "../top-modal";



const ComingSoonView = () => {
    return (
        <FullScreenPage
            name="mesha"
            title=""
            children={
            <>
                <TopBrandLogo logo={Logo} name='Coming Soon'  />
            </>
            }
        />
    );
}

class ComingSoon extends ToolInfo {
    constructor() {
        super({
            id: 'coming_soon',
            name: 'Coming Soon',
            description: 'Working on amazing stuff',
            cover: Logo,
            componentConstructor: () => (<ComingSoonView/>)
        });
    }
}

// We keep everything private and only expose the instance.

const comingSoonInstance = new ComingSoon;
export default comingSoonInstance;