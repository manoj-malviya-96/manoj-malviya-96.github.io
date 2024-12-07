import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "motion/react";
import SlidingAnimation from "./sliding-animation";
import { useEffect } from "react";

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

const ScrollToTop = () => {
    const { pathname } = useLocation();

    useEffect(() => {
        window.scrollTo(0, 30); // Scroll to top but y=30 ? // fixme - why 30?
    }, [pathname]); // Run on every path change

    return null;
};


const RouterConstructor = ({ routes }) => {
    return (
        <Router>
            <ScrollToTop />
            <MakeRoutesWithAnimation routes={routes} />
        </Router>
    );
}

export default RouterConstructor;
