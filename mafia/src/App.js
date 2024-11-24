import React from 'react';
import NavBar from "./elements/navbar";
import RouterConstructor from "./base/router";
import routes from "./elements/routes";
import {AnimatePresence} from "framer-motion";

const App = () => {
    return (
        <div className='flex-row'>
            <NavBar/>
            <AnimatePresence mode="wait">
                <RouterConstructor routes={routes}/>
            </AnimatePresence>
        </div>
    );
};

export default App;
