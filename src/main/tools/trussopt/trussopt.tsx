import React, {useEffect, useState} from 'react';
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
    }
    
    const clearOptimize = () => {
        setOptimizeMesh(null);
        setSimResult(null);
    }
    
    return (
        <AppView
            appName={AppName}
            appLogo={Logo}
        >
            <div className="h-fit w-full flex flex-col-reverse md:flex-row
                                p-0 m-0 gap-8 items-center">
                <div
                    className=" w-fit h-full
                        flex flex-col gap-6 px-2 py-3 rounded-lg
                        justify-center items-center bg-secondary bg-opacity-50">
                    
                    <div className="grid grid-cols-1 lg:grid-cols-2 justify-center items-center">
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
                            className={'w-32 m-auto'}
                            onClick={setLatticeType}
                        />
                    </div>
                    <div className="flex flex-row gap-2">
                        <AtomToggleButton
                            offLabel='Fix Nodes'
                            offIcon='fas fa-lock-open'
                            onIcon='fas fa-lock'
                            tooltip='Add fix nodes to the truss, disabled for now'
                            initValue={false}
                            disabled={true}
                            onChange={(e) => console.log(e)}
                        />
                        <AtomToggleButton
                            offLabel='Load Nodes'
                            offIcon='fas fa-arrow-up'
                            onIcon='fas fa-arrow-down'
                            tooltip='Add Load nodes to the truss, disabled for now'
                            initValue={false}
                            disabled={true}
                            onChange={(e) => console.log(e)}
                        />
                    </div>
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
                            severity={ButtonSeverity.Error}
                            tooltip={'clear optimization results'}
                            onClick={clearOptimize}
                        />
                    </div>
                </div>
                <div className="w-3/4 h-fit flex flex-col gap-2
                                justify-center items-center">
                    <div className='w-fit h-fit flex flex-row gap-4'>
                        <AtomStats text={'Volume'} value={simResult ? simResult.volume : 'N/A'}/>
                        <AtomStats text={'Strain Energy'} value={simResult ? simResult.strainEnergy : 'N/A'}/>
                    </div>
                    <AtomCanvas controller={controller} animationLoop={false}
                                isLoading={canvasLoading}
                                className=" w-full h-fit justify-center items-center
                                                max-h-screen"/>
                </div>
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