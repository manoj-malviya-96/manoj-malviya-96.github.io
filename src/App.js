import React from 'react';
import RouterConstructor from "./providers/router";
import constructedRoutes from "./main/routes";
import {init as initAnalytics} from "./main/analytics";
import MafiaProvider from "./main/mafia-provider";

const App = () => {
    initAnalytics();
    return (
        <MafiaProvider>
            <RouterConstructor routes={constructedRoutes}/>
        </MafiaProvider>
    );
};

export default App;
