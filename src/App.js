import React from 'react';
import NavBar from "./main/navbar";
import RouterConstructor from "./atoms/router";
import constructedRoutes from "./main/routes";
import {ScreenSizeProvider} from "./utils/screen";
const App = () => {
    return (
        <ScreenSizeProvider>
            <NavBar/>
            <RouterConstructor routes={constructedRoutes}/>
        </ScreenSizeProvider>
    );
};

export default App;
