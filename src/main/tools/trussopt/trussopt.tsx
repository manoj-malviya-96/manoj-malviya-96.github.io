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

const AppName = 'TrussOpt';

const TrussOptView = () => {
    const controller = new TrussStructureView();
    const {
        meshWidth, setMeshWidth,
        meshHeight, setMeshHeight,
        cellSize, setCellSize,
        setLatticeType, mesh
    } = useTrussOpt();
    
    useEffect(() => {
        controller.updateMesh(mesh);
        controller.draw();
    }, [mesh]);
    
    return (
        <AppView
            appName={AppName}
            appLogo={Logo}
            children={
                <div className="h-full w-full justify-center align-center">
                    <AtomCanvas controller={controller} animationLoop={false}
                                className="absolute top-0 left-0 w-full h-2/3 translate-y-1/4 z-0 p-8"/>
                    <div
                        className=" absolute bottom-0 left-0 w-full h-fit
                        flex flex-row gap-4 rounded-lg
                        border border-primary z-5
                        justify-center items-center">
                        <AtomKnob
                            label='Cell Size (mm)'
                            min={5}
                            max={20}
                            step={5}
                            initValue={cellSize}
                            onChange={setCellSize}
                        />
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