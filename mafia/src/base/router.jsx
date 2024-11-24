import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import SlidingAnimation from "./sliding-animation";

const MakeRoutesWithAnimation = ({ routes }) => {
    const location = useLocation(); // Track the current route

    return (
        <AnimatePresence mode="wait"> {/* Ensure exit animations are processed */}
            <Routes location={location} key={location.pathname}>
                {routes.map(({ path, component: Component, props, animation }, index) => (
                    <Route
                        key={index}
                        path={path}
                        element={
                            <SlidingAnimation {...animation}>
                                <Component {...props} />
                            </SlidingAnimation>
                        }
                    />
                ))}
            </Routes>
        </AnimatePresence>
    );
};

const RouterConstructor = ({ routes }) => {
    return (
        <Router>
            <MakeRoutesWithAnimation routes={routes} />
        </Router>
    );
}

export default RouterConstructor;
