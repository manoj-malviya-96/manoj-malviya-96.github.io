import React from 'react';
import NavBar from "./elements/navbar";
import RouterConstructor from "./base/router";
import routes from "./elements/routes";

const App = () => {
    return (
        <div className='flex-row'>
            <NavBar/>
            <RouterConstructor routes={routes}/>
        </div>
    );
};

export default App;
