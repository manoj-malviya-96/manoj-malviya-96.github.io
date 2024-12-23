import React, {useMemo} from "react";
import {
    BrowserRouter as Router,
    Routes,
    Route,
    useLocation,
} from "react-router-dom";
import {AnimatePresence, Variants} from "motion/react";
import AtomMotionSlidingAnimation from "../atoms/atom-motion-sliding-animation";
import NavBar from "./navbar";

export interface RouteDefinition {
    path: string;
    component: React.FC<any>;
    props?: Record<string, any>;
    animation?: Variants;
}

interface MakeRoutesWithAnimationProps {
    routes: RouteDefinition[];
}

const MakeRoutesWithAnimation: React.FC<MakeRoutesWithAnimationProps> = ({routes}) => {
    const location = useLocation();
    return (
        <AnimatePresence mode="wait">
            <Routes location={location} key={location.key || location.pathname}>
                {routes.map(({path, component: Component, props}, index) => (
                    <Route
                        key={index}
                        path={path}
                        element={
                            <AtomMotionSlidingAnimation>
                                <Component {...props} />
                            </AtomMotionSlidingAnimation>
                        }
                    />
                ))}
                <Route path="*" element={
                    <span
                        className={`fixed left-1/2 top-1/2 transform -translate-x-1/2 -transform-y-1/2
                                    text-2xl text-center uppercase`}>
                            Oops Wrong Path, use Home to be safe and happy! See you there :)
                        </span>
                }
                />
            </Routes>
        </AnimatePresence>
    );
};

interface RouterConstructorProps {
    routes: RouteDefinition[];
}

const _RouterConstructor: React.FC<RouterConstructorProps> = ({routes}) => {
    const memoizedRoutes = useMemo(() => routes, [routes]);
    
    return (
        <Router>
            <NavBar/>
            <MakeRoutesWithAnimation routes={memoizedRoutes}/>
        </Router>
    );
};

const RouterConstructor = React.memo(_RouterConstructor);
export default RouterConstructor;
