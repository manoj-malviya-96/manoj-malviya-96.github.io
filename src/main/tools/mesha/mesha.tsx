import React from 'react';
import ToolInfo from "../tool-info";
import Logo from '../logos/mesha.svg';
import AppView from "../app-view";
import {AtomHeroTitleText} from "../../../atoms/atom-text";

const AppName = 'MESHA';

const MeshaView = () => {
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

class Mesha extends ToolInfo {
	constructor() {
		super({
			id: 'mesha',
			name: AppName,
			description: 'visualize + analyze + edit your 3D mesh',
			cover: Logo,
			componentConstructor: () => (
				<MeshaView/>
			)
		});
	}
}

export default Mesha;