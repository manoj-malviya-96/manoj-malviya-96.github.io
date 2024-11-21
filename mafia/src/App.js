import React from 'react';
import HomePage from "./elements/home";
import NavBar from "./elements/navbar";

const App = () => {
    return (
        <div className='flex-row gap-4'>
            <NavBar/>
            <HomePage/>
        </div>
    );
};

export default App;
