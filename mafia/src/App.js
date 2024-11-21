import React from 'react';
import HomePage from "./elements/home-page";
import NavBar from "./elements/nav-bar";

const App = () => {
    return (
        <div className='flex-row gap-4'>
            <NavBar/>
            <HomePage/>
        </div>
    );
};

export default App;
