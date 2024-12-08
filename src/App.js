import React from 'react';
import NavBar from "./main/navbar";
import RouterConstructor from "./common/router";
import constructedRoutes from "./main/routes";
import {ScreenSizeProvider} from "./common/screen";
import {ThemeProvider} from "./main/theme";

const App = () => {
    return (
        <ThemeProvider>
            <ScreenSizeProvider>
                <RouterConstructor routes={constructedRoutes}/>
            </ScreenSizeProvider>
        </ThemeProvider>
    );
};

export default App;
