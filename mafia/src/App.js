import React from 'react';
import NavBar from "./main/navbar";
import RouterConstructor from "./base/router";
import constructedRoutes from "./main/routes";

const App = () => {
    return (
        <div className='flex-row'>
            <NavBar/>
            <RouterConstructor routes={constructedRoutes}/>
        </div>
    );
};

export default App;
