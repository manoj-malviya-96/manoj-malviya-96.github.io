import React, {useCallback, useEffect, useState} from 'react';
import ToolInfo from "../tool-info";
import Logo from '../logos/trussopt.svg';
import AppView from "../app-view";
import AtomKnob from "../../../atoms/atom-knob";
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
import AtomGroup, {AtomGroupLayout} from "../../../atoms/atom-group";

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
		console.log('Optimize');
		setCanvasLoading(true);
		if (!mesh) {
			throw new Error('Null Scene');
		}
		const optimizer = new TrussOptimizer(structuredClone(mesh));
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
	}, [mesh, controller, clearOptimize]);
	
	useEffect(() => {
		clearOptimize();
	}, [mesh, clearOptimize]);
	
	return (
		<AppView
			appName={AppName}
			appLogo={Logo}
		>
			<div className="h-full w-full flex flex-col-reverse md:flex-row
                                p-0 m-0 gap-4 mt-12">
				<div
					className="w-full h-full md:w-fit md:h-fit
                        flex flex-col gap-3">
					<AtomGroup
						label={'Design Inital Truss'}
						className={'w-full'}
					>
						<div className="p-0 flex flex-row justify-center items-center">
							<AtomKnob
								label='Width'
								min={cellSize}
								max={100}
								step={cellSize}
								initValue={meshWidth}
								onChange={setMeshWidth}
							/>
							<AtomKnob
								label='Height'
								min={cellSize}
								max={100}
								step={cellSize}
								initValue={meshHeight}
								onChange={setMeshHeight}
							/>
							<AtomKnob
								label='Cell Size'
								min={5}
								max={20}
								step={5}
								initValue={cellSize}
								onChange={setCellSize}
							/>
						</div>
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
							className={'w-32 mx-auto'}
							onClick={setLatticeType}
						/>
					</AtomGroup>
					
					<AtomGroup
						label={'FEA'}
						layout={AtomGroupLayout.Horizontal}
						className={'w-full'}>
						
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
					</AtomGroup>
					<AtomGroup label={'Optimization'} className={'w-full'}>
						<div className="flex flex-row gap-2">
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
						</div>
					</AtomGroup>
				</div>
				<AtomGroup
					label={'Truss Structure'}
					className={'w-full h-full'}
				>
					<AtomCanvas controller={controller} animationLoop={false}
					            isLoading={canvasLoading}
					            className="w-full h-full p-4"/>
					<div className='absolute right-0 bottom-0
                                    z-5 bg-primary bg-opacity-80 backdrop-blur-lg'>
						<AtomStats
							text={'Volume'}
							value={simResult ? simResult.volume : 'N/A'}
							severity={optimizeMesh ? StatSeverity.Info : StatSeverity.Primary}
						/>
						<AtomStats
							text={'Strain Energy'}
							value={simResult ? simResult.strainEnergy : 'N/A'}
							severity={optimizeMesh ? StatSeverity.Info : StatSeverity.Primary}
						/>
					</div>
				</AtomGroup>
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


// We keep everything private and only expose the instance.
const trussOptInstance = new TrussOpt();
export default trussOptInstance;