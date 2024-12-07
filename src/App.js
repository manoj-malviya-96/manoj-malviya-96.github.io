import React from 'react';
import NavBar from "./main/navbar";
import RouterConstructor from "./common/router";
import constructedRoutes from "./main/routes";
import {ScreenSizeProvider} from "./common/screen";

const App = () => {
    return (
        <ScreenSizeProvider>
            <NavBar/>
            <RouterConstructor routes={constructedRoutes}/>
        </ScreenSizeProvider>
    );
};

export default App;
