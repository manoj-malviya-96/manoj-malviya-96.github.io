import React, {useEffect} from 'react';
import ToolInfo from "../tool-info";
import Logo from '../logos/trussopt.svg';
import AppView from "../../../atoms/app-view";
import AtomKnob from "../../../atoms/atom-knob";
import AtomToggleButton from "../../../atoms/atom-toggle-button";
import {AtomButton} from "../../../atoms/atom-button";
import AtomDropdown from "../../../atoms/atom-dropdown";
import {TrussStructureView, useTrussOpt} from "./truss-controller";
import {LatticeType} from "./truss-mesh";
import {AtomCanvas} from "../../../atoms/atom-canvas";
import {useTheme} from "../../../common/theme";

const AppName = 'TrussOpt';

const TrussOptView = () => {
    const {
        meshWidth, setMeshWidth,
        meshHeight, setMeshHeight,
        cellSize, setCellSize,
        setLatticeType, mesh
    } = useTrussOpt();
    
    const {
        daisyPrimaryText,
    } = useTheme();
    
    
    const controller = new TrussStructureView(daisyPrimaryText, mesh);
    
    useEffect(() => {
        controller.trussColor = daisyPrimaryText;
        controller.updateMesh(mesh);
    }, [mesh, daisyPrimaryText]);
    
    return (
        <AppView
            appName={AppName}
            appLogo={Logo}
            children={
                <div className="h-fit w-full flex flex-col-reverse md:flex-row
                                p-0 m-0 gap-2 items-center">
                    <div
                        className=" w-fit h-full
                        flex flex-col gap-4 rounded-lg
                        border border-primary
                        justify-center items-center p-2">
                        
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
                            onClick={setLatticeType}
                        />
                        <div className="flex flex-row gap-2">
                            <AtomToggleButton
                                offLabel='Fix Nodes'
                                offIcon='pi pi-lock-open'
                                onIcon='pi pi-lock'
                                tooltip='Add fix nodes to the truss'
                                initValue={false}
                                onChange={(e) => console.log(e)}
                            />
                            <AtomToggleButton
                                offLabel='Load Nodes'
                                offIcon='pi pi-arrow-up'
                                onIcon='pi pi-arrow-down'
                                tooltip='Add Load nodes to the truss'
                                initValue={false}
                                onChange={(e) => console.log(e)}
                            />
                        </div>
                        <AtomButton
                            label='Analyze'
                            icon='pi pi-play'
                            onClick={() => console.log('Analyze')}
                        />
                        <AtomButton
                            label='Optimize'
                            icon='pi pi-cog'
                            severity={'info'}
                            onClick={() => console.log('Optimize')}
                        />
                        <AtomButton
                            label='Clear'
                            icon='fas fa-trash'
                            severity={'danger'}
                            onClick={() => console.log('Refresh')}
                        />
                    </div>
                    <AtomCanvas controller={controller} animationLoop={false}
                                className=" w-3/4 h-fit
                                            justify-center items-center max-h-screen p-2"/>
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