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
				<AtomHeroTitleText>Coming soon...</AtomHeroTitleText>
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

export default Nestor;