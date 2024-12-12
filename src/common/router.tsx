import React, {useEffect} from "react";
import {
    BrowserRouter as Router,
    Routes,
    Route,
    useLocation
} from "react-router-dom";
import {AnimatePresence, Variants} from "motion/react";
import SlidingAnimation from "../atoms/sliding-animation";
import NavBar from "../main/navbar";

// Define the type for an individual route
export interface RouteDefinition {
    path: string;
    component: React.FC<any>; // Adjust "any" to specific props if
                              // needed
    props?: Record<string, any>; // Props to pass to the component
    animation?: Variants; // Optional animation variants for
                          // SlidingAnimation
}

interface MakeRoutesWithAnimationProps {
    routes: RouteDefinition[];
}

const MakeRoutesWithAnimation: React.FC<MakeRoutesWithAnimationProps> = ({routes}) => {
    const location = useLocation(); // Track the current route
    
    return (
        <AnimatePresence mode="wait">
            {/* Ensure exit animations are processed */}
            <Routes location={location} key={location.pathname}>
                {routes.map(({
                                 path,
                                 component: Component,
                                 props,
                                 animation
                             }, index) => (
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

interface RouterConstructorProps {
    routes: RouteDefinition[];
}

const RouterConstructor: React.FC<RouterConstructorProps> = ({routes}) => {
    return (
        <Router>
            <NavBar/>
            <MakeRoutesWithAnimation routes={routes}/>
        </Router>
    );
};

export default RouterConstructor;
