import React from 'react';
import AtomFullScreenContainer from "../atoms/atom-full-screen-container";
import {registeredTools} from "./tools/tool-registry";
import {rangesTo} from "../common/math";
import {useNavigate} from "react-router-dom";
import {AtomCardGrid} from "../atoms/atom-card";
import AtomStyledContainer from "../atoms/atom-styled-container";
import {AtomColumn, AtomLayoutGap, AtomLayoutSize, AtomRow} from "../atoms/atom-layout";
import {AtomHeroBrandTitleText, AtomHeroTitleText} from "../atoms/atom-text";


const ToolDrawer = () => {
	const navigate = useNavigate();
	
	const items = rangesTo(registeredTools, (tool) => {
		return {
			title: tool.name,
			description: tool.description,
			image: tool.cover,
			onClick: () => navigate(tool.path),
			centered: true,
		};
	});
	
	return (
		<AtomFullScreenContainer
			name="tools"
		>
			<AtomColumn gap={AtomLayoutGap.Small}>
				<AtomRow size={AtomLayoutSize.FullSize} gap={AtomLayoutGap.ExtraSmall}>
					<AtomHeroTitleText>Creating in</AtomHeroTitleText>
					<AtomHeroBrandTitleText>Shadows.</AtomHeroBrandTitleText>
				</AtomRow>
				<AtomStyledContainer label="Playground">
					<AtomCardGrid
						items={items}
						classNameForCard={'w-44 h-36'}/>
				</AtomStyledContainer>
			</AtomColumn>
		</AtomFullScreenContainer>
	);
}

export default ToolDrawer;


