import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

const AbstractRouter = ({ routes }) => {
    return (
        <BrowserRouter>
            <Routes>
                {routes.map(({ path, component: Component, props }, index) => (
                    <Route key={index} path={path} element={<Component {...props} />} />
                ))}
            </Routes>
        </BrowserRouter>
    );
};

export default AbstractRouter;
