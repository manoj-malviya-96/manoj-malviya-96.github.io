import React from 'react';
import ToolInfo from "../tool-info";
import Logo from '../logos/nestor.svg';
import AppView from "../app-view";
import {AtomHeroTitleText} from "../../../atoms/atom-text";

const AppName = 'NESTOR';

const NestorView = () => {
	return (
		<AppView
			appName={AppName}
			appLogo={Logo}
			children={
				<AtomHeroTitleText text={`Coming soon...`}/>
			}
		/>
	)
}

class Nestor extends ToolInfo {
	constructor() {
		super({
			id: 'nestor',
			name: AppName,
			description: 'max duplicate all items in a box',
			cover: Logo,
			componentConstructor: () => (
				<NestorView/>
			)
		});
	}
}


// We keep everything private and only expose the instance.
const nestorInstance = new Nestor()
;
export default nestorInstance;