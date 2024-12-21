import React from "react";
import {
    BrowserRouter as Router,
    Routes,
    Route,
    useLocation
} from "react-router-dom";
import {AnimatePresence, Variants} from "motion/react";
import AtomMotionSlidingAnimation from "../atoms/atom-motion-sliding-animation";
import NavBar from "./navbar";

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
                            <AtomMotionSlidingAnimation {...animation}>
                                <Component {...props} />
                            </AtomMotionSlidingAnimation>
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

const _RouterConstructor: React.FC<RouterConstructorProps> = ({routes}) => {
    return (
        <Router>
            <NavBar/>
            <MakeRoutesWithAnimation routes={routes}/>
        </Router>
    );
};

const RouterConstructor = React.memo(_RouterConstructor);
export default RouterConstructor;
