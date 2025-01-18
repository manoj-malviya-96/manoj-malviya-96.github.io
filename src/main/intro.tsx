import React from 'react';
import AtomFullScreenContainer from "../atoms/atom-full-screen-container";

import {AtomPrimaryText, AtomSuperHeroBrandTitleText} from "../atoms/atom-text";
import {AtomColumn, AtomLayoutGap} from "../atoms/atom-layout";
import {useTheme} from "../providers/theme";
import CoverDark from "./assets/cover-dark.gif";
import CoverLight from "./assets/cover-light.gif";

const Intro = () => {
	const {isDark} = useTheme();
	return (
		<AtomFullScreenContainer
			name="intro"
			backgroundImage={isDark ? CoverDark : CoverLight}
		>
			<div className={'block absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2'}>
				<AtomColumn wrap={true} gap={AtomLayoutGap.None}>
					<AtomPrimaryText className={'w-full text-center'}>
						Manoj Malviya
					</AtomPrimaryText>
					
					<AtomSuperHeroBrandTitleText
						className={'text-center w-fit md:w-1/2'}> Creating Tools for Humanity
					</AtomSuperHeroBrandTitleText>
				</AtomColumn>
			</div>
		</AtomFullScreenContainer>
	);
};

export default Intro;
