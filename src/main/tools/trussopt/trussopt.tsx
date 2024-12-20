import React, {useEffect, useState} from 'react';
import ToolInfo from "../tool-info";
import Logo from '../logos/trussopt.svg';
import AppView from "../../../atoms/app-view";
import AtomKnob from "../../../atoms/atom-knob";
import AtomToggleButton from "../../../atoms/atom-toggle-button";
import {AtomButton, ButtonSeverity} from "../../../atoms/atom-button";
import AtomDropdown from "../../../atoms/atom-dropdown";
import {TrussStructureView, useTrussOpt} from "./truss-controller";
import TrussMesh, {LatticeType} from "./truss-mesh";
import {AtomCanvas} from "../../../atoms/atom-canvas";
import {useTheme} from "../../../common/theme";
import AtomStats from "../../../atoms/atom-stats";
import TrussFea, {TrussFeaResults} from "./truss-fea";
import TrussOptimizer from "./truss-optimizer";

const AppName = 'TrussOpt';

const TrussOptView = () => {
    const {
        meshWidth, setMeshWidth,
        meshHeight, setMeshHeight,
        cellSize, setCellSize,
        setLatticeType, mesh,
    } = useTrussOpt();
    
    const {
        daisyPrimary,
    } = useTheme();
    
    const controller = React.useMemo(() => {
        return new TrussStructureView();
    }, []);
    
    const [canvasLoading, setCanvasLoading] = useState<boolean>(false);
    const [simResult, setSimResult] = useState<TrussFeaResults | null>();
    const [optimizeMesh, setOptimizeMesh] = useState<TrussMesh | null>(null);
    
    useEffect(() => {
        controller.trussColor = daisyPrimary;
        controller.feaEngine = null;
        if (optimizeMesh) {
            controller.updateMesh(optimizeMesh);
        } else {
            controller.updateMesh(mesh);
        }
    }, [controller, mesh, optimizeMesh, daisyPrimary]);
    
    const simulate = () => {
        if (!mesh) {
            return;
        }
        const feaEngine = new TrussFea(mesh);
        feaEngine.compute();
        controller.addFeaResults(feaEngine);
        setSimResult(feaEngine.getResults());
    }
    
    const optimize = async () => {
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
    }
    
    const clearOptimize = () => {
        setOptimizeMesh(null);
        setSimResult(null);
    }
    
    return (
        <AppView
            appName={AppName}
            appLogo={Logo}
            children={
                <div className="h-fit w-full flex flex-col-reverse md:flex-row
                                p-0 m-0 gap-8 items-center">
                    <div
                        className=" w-fit h-full
                        flex flex-col gap-6 px-2 py-6 rounded-lg
                        border border-primary
                        justify-center items-center">
                        
                        <div className="flex flex-row gap-1">
                            <AtomKnob
                                label='Mesh Width (mm)'
                                min={cellSize}
                                max={100}
                                step={cellSize}
                                initValue={meshWidth}
                                onChange={setMeshWidth}
                            />
                            <AtomKnob
                                label='Mesh Height (mm)'
                                min={cellSize}
                                max={100}
                                step={cellSize}
                                initValue={meshHeight}
                                onChange={setMeshHeight}
                            />
                        </div>
                        <AtomKnob
                            label='Cell Size (mm)'
                            min={5}
                            max={20}
                            step={5}
                            initValue={cellSize}
                            onChange={setCellSize}
                        />
                        <AtomDropdown
                            placeholder='Select Lattice Type'
                            initialIndex={0}
                            options={[
                                {label: 'Cross', value: LatticeType.Cross},
                                {
                                    label: 'Checkerboard',
                                    value: LatticeType.Checkerboard
                                }
                            ]}
                            className={'w-40'}
                            onClick={setLatticeType}
                        />
                        <div className="flex flex-row gap-2">
                            <AtomToggleButton
                                offLabel='Fix Nodes'
                                offIcon='pi pi-lock-open'
                                onIcon='pi pi-lock'
                                tooltip='Add fix nodes to the truss, disabled for now'
                                initValue={false}
                                disabled={true}
                                onChange={(e) => console.log(e)}
                            />
                            <AtomToggleButton
                                offLabel='Load Nodes'
                                offIcon='pi pi-arrow-up'
                                onIcon='pi pi-arrow-down'
                                tooltip='Add Load nodes to the truss, disabled for now'
                                initValue={false}
                                disabled={true}
                                onChange={(e) => console.log(e)}
                            />
                        </div>
                        <AtomToggleButton
                            offLabel='Simulate'
                            offIcon='pi pi-play'
                            onIcon='pi pi-stop'
                            onChange={(e: boolean) => {
                                if (e) {
                                    simulate();
                                } else {
                                    controller.addFeaResults(null);
                                }
                            }}
                        />
                        <div className="flex flex-row gap-2">
                            <AtomButton
                                label='Optimize'
                                icon='pi pi-cog'
                                severity={ButtonSeverity.Success}
                                tooltip={'optimize the truss'}
                                onClick={optimize}
                            />
                            <AtomButton
                                icon='fas fa-trash'
                                severity={ButtonSeverity.Error}
                                tooltip={'clear optimization results'}
                                onClick={clearOptimize}
                            />
                        </div>
                    </div>
                    <div className="w-3/4 h-fit flex flex-col gap-2">
                        <div className='w-fit h-fit flex flex-row gap-2'>
                            <AtomStats text={'Volume'} value={simResult ? simResult.volume : 'N/A'}/>
                            <AtomStats text={'Strain Energy'} value={simResult ? simResult.strainEnergy : 'N/A'}/>
                        </div>
                        <AtomCanvas controller={controller} animationLoop={false}
                                    isLoading={canvasLoading}
                                    className=" w-full h-fit justify-center items-center
                                                max-h-screen"/>
                    </div>
                </div>
            }
        />
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