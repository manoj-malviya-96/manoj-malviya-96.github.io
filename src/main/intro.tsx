import React from 'react';
import AtomFullScreenContainer from "../atoms/atom-full-screen-container";
import Cover from "./assets/cover.webp";
import {AtomButton} from "../atoms/atom-button";
import {AtomPrimaryText, AtomSuperHeroBrandTitleText} from "../atoms/atom-text";
import {AtomColumn} from "../atoms/atom-layout";

const Intro = () => {
	return (
		<AtomFullScreenContainer
			name="intro"
			backgroundImage={Cover}
		>
			<div className={`w-full h-full flex flex-col-reverse
                                     md:flex-row gap-4 p-8 items-start
                                     rounded-lg`}>
				
				<AtomColumn wrap={true}>
					<AtomPrimaryText className={'w-full text-center'}>
						Manoj Malviya
					</AtomPrimaryText>
					
					<AtomSuperHeroBrandTitleText
						className={'text-center w-1/2'}> Making shit since '96
					</AtomSuperHeroBrandTitleText>
					
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
			</div>
		</AtomFullScreenContainer>
	);
};

export default Intro;
