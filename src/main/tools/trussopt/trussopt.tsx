import React, {useCallback, useEffect, useState} from 'react';
import ToolInfo from "../tool-info";
import Logo from '../logos/trussopt.svg';
import AppView from "../app-view";
import AtomToggleButton from "../../../atoms/atom-toggle-button";
import {AtomButton, ButtonSeverity, ButtonType} from "../../../atoms/atom-button";
import AtomDropdown from "../../../atoms/atom-dropdown";
import {TrussStructureView, useTrussOpt} from "./truss-controller";
import TrussMesh, {LatticeType} from "./truss-mesh";
import {AtomCanvas} from "../../../atoms/atom-canvas";
import {useTheme} from "../../../providers/theme";
import AtomStats, {StatSeverity} from "../../../atoms/atom-stats";
import TrussFea, {TrussFeaResults} from "./truss-fea";
import TrussOptimizer from "./truss-optimizer";
import AtomStyledContainer from "../../../atoms/atom-styled-container";
import {AtomGrid, AtomLayoutGap, AtomLayoutSize, AtomRow} from "../../../atoms/atom-layout";
import AtomSlider from "../../../atoms/atom-slider";

const AppName = 'TrussOpt';
const TrussOptView = () => {
	const {
		meshWidth, setMeshWidth,
		meshHeight, setMeshHeight,
		cellSize, setCellSize,
		setLatticeType, mesh,
	} = useTrussOpt();
	
	const {
		daisyPrimaryText,
	} = useTheme();
	
	const controller = React.useMemo(() => {
		return new TrussStructureView();
	}, []);
	
	const [canvasLoading, setCanvasLoading] = useState<boolean>(false);
	const [simResult, setSimResult] = useState<TrussFeaResults | null>();
	const [optimizeMesh, setOptimizeMesh] = useState<TrussMesh | null>(null);
	const [numIterations, setNumIterations] = useState<number>(100);
	const [targetFraction, setTargetFraction] = useState<number>(0.3);
	
	useEffect(() => {
		controller.trussColor = daisyPrimaryText;
		controller.feaEngine = null;
		if (optimizeMesh) {
			controller.updateMesh(optimizeMesh);
		} else {
			controller.updateMesh(mesh);
		}
	}, [controller, mesh, optimizeMesh, daisyPrimaryText]);
	
	
	const simulate = useCallback(() => {
		const feaEngine = optimizeMesh ? new TrussFea(optimizeMesh) :
			mesh ? new TrussFea(structuredClone(mesh)) : null;
		if (!feaEngine) {
			throw new Error('Null Scene');
		}
		
		feaEngine.compute();
		controller.addFeaResults(feaEngine);
		setSimResult(feaEngine.getResults());
	}, [controller, optimizeMesh, mesh]);
	
	
	const clearOptimize = useCallback(() => {
		setOptimizeMesh(null);
		setSimResult(null);
		controller.addFeaResults(null);
	}, [controller]);
	
	const optimize = useCallback(async () => {
		setCanvasLoading(true);
		if (!mesh) {
			throw new Error('Null Scene');
		}
		const optimizer = new TrussOptimizer(structuredClone(mesh), numIterations, targetFraction);
		try {
			await optimizer.optimize();
			if (optimizer.success) {
				setOptimizeMesh(optimizer.currentMesh);
				controller.addFeaResults(null);
				setSimResult(optimizer.lastFEAResult);
			} else {
				clearOptimize();
			}
		}
		catch (e: any) {
			console.error(e);
			clearOptimize();
		}
		setCanvasLoading(false);
	}, [mesh, controller, clearOptimize, numIterations, targetFraction]);
	
	useEffect(() => {
		clearOptimize();
	}, [mesh, numIterations, targetFraction, clearOptimize]);
	
	return (
		<AppView
			appName={AppName}
			appLogo={Logo}
		>
			<div className="h-full w-full flex flex-col-reverse md:flex-row gap-4 mt-12">
				<div
					className="w-full h-full md:w-1/4 md:h-full
                        flex flex-col gap-2 shrink-0">
					
					<AtomStyledContainer
						label={'Design Initial Truss'}
						transparency={false}
					>
						<AtomGrid gap={AtomLayoutGap.Small} size={AtomLayoutSize.FullWidth}>
							<AtomSlider
								label='Width'
								className="w-full h-fit"
								min={cellSize}
								max={100}
								step={cellSize}
								value={meshWidth}
								onChange={setMeshWidth}
							/>
							<AtomSlider
								label='Height'
								min={cellSize}
								max={100}
								step={cellSize}
								className="w-full h-fit"
								value={meshHeight}
								onChange={setMeshHeight}
							/>
							<AtomSlider
								label='Cell Size'
								min={5}
								max={20}
								step={5}
								className="w-full h-fit"
								value={cellSize}
								onChange={setCellSize}
							/>
							<AtomDropdown
								placeholder='Select Lattice Type'
								initialIndex={0}
								dropdownIcon={'fas fa-layer-group'}
								options={[
									{
										label: 'Cross',
										value: LatticeType.Cross
									},
									{
										label: 'Checker',
										value: LatticeType.Checkerboard
									}
								]}
								className={'w-24 mx-auto mt-6'}
								onClick={setLatticeType}
							/>
						</AtomGrid>
					</AtomStyledContainer>
					
					<AtomStyledContainer label={'FEA Controls'}>
						<AtomRow size={AtomLayoutSize.FullWidth} gap={AtomLayoutGap.Small}>
							<AtomToggleButton
								offIcon='fas fa-lock-open'
								onIcon='fas fa-lock'
								tooltip='Add fix nodes to the truss, disabled for now'
								initValue={false}
								disabled={true}
								onChange={(e) => console.log(e)}
							/>
							<AtomToggleButton
								offIcon='fas fa-arrow-up'
								onIcon='fas fa-arrow-down'
								tooltip='Add Load nodes to the truss, disabled for now'
								initValue={false}
								disabled={true}
								onChange={(e) => console.log(e)}
							/>
							<AtomToggleButton
								offLabel='Simulate'
								offIcon='fas fa-play'
								onIcon='fas fa-stop'
								tooltip='simulate the truss'
								className={'w-fit'}
								initValue={controller.feaEngine !== null}
								type={ButtonType.Outlined}
								onChange={(e: boolean) => {
									if (e) {
										simulate();
									} else {
										controller.addFeaResults(null);
									}
								}}
							/>
						</AtomRow>
					</AtomStyledContainer>
					
					<AtomStyledContainer
						label={'Optimization'}
						className={'w-full'}>
						
						<AtomGrid size={AtomLayoutSize.FullWidth} gap={AtomLayoutGap.Medium}>
							<AtomSlider
								label='Iterations'
								min={5}
								max={500}
								step={5}
								className="w-full h-fit"
								value={numIterations}
								onChange={setNumIterations}
							/>
							<AtomSlider
								label='Target'
								min={0.1}
								max={0.9}
								step={0.1}
								className="w-full h-fit"
								value={targetFraction}
								onChange={setTargetFraction}
							/>
							
							<AtomButton
								label='Optimize'
								icon='fas fa-bolt-lightning'
								severity={ButtonSeverity.Info}
								tooltip={'optimize the truss'}
								onClick={optimize}
							/>
							<AtomButton
								icon='fas fa-trash'
								label={'Clear'}
								severity={ButtonSeverity.Error}
								tooltip={'clear optimization results'}
								onClick={clearOptimize}
							/>
						</AtomGrid>
					</AtomStyledContainer>
				</div>
				
				
				<AtomStyledContainer
					label={'Output'}
					className={'w-full md:w-3/4 h-full inline-block relative overflow-hidden'}
					transparency={true}
				>
					<AtomCanvas controller={controller} animationLoop={false}
					            isLoading={canvasLoading}
					            className="w-full h-full p-4"/>
					
					<div className='absolute right-0 bottom-0 p-4
                                    z-5 bg-primary bg-opacity-80 backdrop-blur-lg'>
						<AtomRow size={AtomLayoutSize.FullWidth}>
							<AtomStats
								className={'w-fit h-full'}
								text={'Volume'}
								value={simResult ? simResult.volume : 'N/A'}
								severity={optimizeMesh ? StatSeverity.Info : StatSeverity.Primary}
							/>
							<AtomStats
								className={'w-fit h-full'}
								text={'Energy'}
								value={simResult ? simResult.strainEnergy : 'N/A'}
								severity={optimizeMesh ? StatSeverity.Info : StatSeverity.Primary}
							/>
						</AtomRow>
					</div>
				
				</AtomStyledContainer>
			</div>
		</AppView>
	)
}

class TrussOpt extends ToolInfo {
	constructor() {
		super({
			id: 'trussopt',
			name: AppName,
			description: 'create + analyze + optimize your truss',
			cover: Logo,
			componentConstructor: () => (
				<TrussOptView/>
			)
		});
	}
}

export default TrussOpt;