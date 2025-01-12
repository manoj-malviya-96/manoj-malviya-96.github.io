import React from 'react';
import AtomFullScreenContainer from "../atoms/atom-full-screen-container";
import ProfilePicture from "./assets/main.jpg";
import {AtomButton} from "../atoms/atom-button";
import AtomImage from "../atoms/atom-image";
import {AtomPrimaryText, AtomSecondaryText, AtomSuperHeroBrandTitleText} from "../atoms/atom-text";
import {AtomColumn} from "../atoms/atom-layout";

const Intro = () => {
	return (
		<AtomFullScreenContainer
			name="intro"
			children={
				(
					<div className={`w-full h-full flex flex-col-reverse
                                     md:flex-row gap-4 p-8 items-center`}>
						<AtomColumn wrap={true}>
							<AtomPrimaryText className={'w-full text-center'}>
								Manoj Malviya
							</AtomPrimaryText>
							
							<AtomSuperHeroBrandTitleText
								className={'text-center w-full'}>Multidisciplinary software engineer
							</AtomSuperHeroBrandTitleText>
							
							<AtomSecondaryText className={'w-full text-center'}>
								Innovating with knack of creativity and problem solving
							</AtomSecondaryText>
							
							<AtomButton
								icon="fas fa-arrow-down"
								label="Scroll Down for more"
								animated={true}
								onClick={() => {
									window.scroll({
										top: window.innerHeight,
										behavior: 'smooth'
									});
								}}
							/>
						</AtomColumn>
						<AtomImage src={ProfilePicture} alt={'profile picture'}
						           className={'rounded-lg'}/>
					</div>
				)
			}
		/>
	);
};

export default Intro;
