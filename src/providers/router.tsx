import React, {ReactNode, useEffect, useMemo} from "react";
import {
	BrowserRouter as Router,
	Routes,
	Route,
	useLocation,
} from "react-router-dom";
import {AnimatePresence, motion, Variants} from "motion/react";
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

interface RouterAnimationProps {
	children: ReactNode;
}

const RouterAnimation: React.FC<RouterAnimationProps> = ({children}) => {
	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);
	
	return (
		<motion.div
			initial={{opacity: 0, y: '100vh'}}
			animate={{opacity: 1, y: 0}}
			exit={{opacity: 0, y: '-100vh'}}
			transition={{duration: 0.27}}
		>
			{children}
		</motion.div>
	);
};


const MakeRoutesWithAnimation: React.FC<MakeRoutesWithAnimationProps> = ({routes}) => {
	const location = useLocation();
	return (
		<AnimatePresence mode="wait">
			<Routes location={location} key={location.key || location.pathname}>
				{routes.map(({path, component: Component, props}
					, index) => (
					<Route
						key={index}
						path={path}
						element={
							<RouterAnimation>
								<Component {...props} />
							</RouterAnimation>
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

const RouterConstructor: React.FC<RouterConstructorProps> = React.memo(({routes}) => {
	const memoizedRoutes = useMemo(() => routes, [routes]);
	
	return (
		<Router>
			<NavBar/>
			<MakeRoutesWithAnimation routes={memoizedRoutes}/>
		</Router>
	);
});

export default RouterConstructor;
