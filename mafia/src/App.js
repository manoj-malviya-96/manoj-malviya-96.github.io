import React from 'react';
import NavBar from "./elements/navbar";
import AbstractRouter from "./base/router";
import routes from "./elements/routes";

const App = () => {
    return (
        <div className='flex-row gap-4'>
            <NavBar/>
            <AbstractRouter routes={routes}/>
        </div>
    );
};

export default App;
