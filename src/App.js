import React from 'react';
import RouterConstructor from "./providers/router";
import constructedRoutes from "./main/routes";
import MafiaProvider from "./main/mafia-provider";
import initWebsite from "./main/init";

const App = () => {
    initWebsite();
    return (
        <MafiaProvider>
            <RouterConstructor routes={constructedRoutes}/>
        </MafiaProvider>
    );
};

export default App;
