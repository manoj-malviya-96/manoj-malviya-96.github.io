import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

const AbstractRouter = ({ routes }) => {
    return (
        <Router>
            <Routes>
                {routes.map(({ path, component: Component, props }, index) => (
                    <Route key={index} path={path} element={<Component {...props} />} />
                ))}
            </Routes>
        </Router>
    );
};

export default AbstractRouter;
