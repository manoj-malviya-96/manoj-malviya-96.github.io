import React from 'react';
import {registeredTools} from "./tools/tool-registry";
import {rangesTo} from "../common/math";
import {useNavigate} from "react-router-dom";
import {AtomCardGrid} from "../atoms/atom-card";
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
		<AtomColumn gap={AtomLayoutGap.Small} size={AtomLayoutSize.FullSize}>
			<AtomRow gap={AtomLayoutGap.ExtraSmall}>
				<AtomHeroTitleText>Creating in</AtomHeroTitleText>
				<AtomHeroBrandTitleText>Shadows.</AtomHeroBrandTitleText>
			</AtomRow>
			
			<AtomCardGrid
				items={items}
				classNameForCard={'w-44 h-36'}/>
		</AtomColumn>
	);
}

export default ToolDrawer;


