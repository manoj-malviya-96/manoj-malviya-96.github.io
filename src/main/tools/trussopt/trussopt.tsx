import React from 'react';
import ToolInfo from "../tool-info";
import Logo from '../logos/trussopt.svg';
import AppView from "../../../atoms/app-view";
import AtomKnob from "../../../atoms/atom-knob";
import AtomToggleButton from "../../../atoms/atom-toggle-button";
import {AtomButton} from "../../../atoms/atom-button";
import AtomDropdown from "../../../atoms/atom-dropdown";

const AppName = 'TrussOpt';

const TrussOptView = () => {
    
    
    return (
        <AppView
            appName={AppName}
            appLogo={Logo}
            children={
                <div
                    className=" absolute bottom-0 left-0 w-full h-fit
                        flex flex-row gap-4 rounded-lg
                        border border-primary
                        justify-center items-center">
                    <AtomKnob
                        label='Cell Size (mm)'
                        min={2}
                        max={100}
                        step={1}
                        initValue={10}
                        onChange={(e) => console.log(e)}
                    />
                    <AtomKnob
                        label='Mesh Width (mm)'
                        min={2}
                        max={100}
                        step={1}
                        initValue={10}
                        onChange={(e) => console.log(e)}
                    />
                    <AtomKnob
                        label='Mesh Height (mm)'
                        min={2}
                        max={100}
                        step={1}
                        initValue={10}
                        onChange={(e) => console.log(e)}
                    />
                    <AtomDropdown
                        placeholder='Select Lattice Type'
                        initialIndex={0}
                        options={[
                            {label: 'Cross', value: 'cross'},
                            {
                                label: 'Checkerboard',
                                value: 'checkerboard'
                            }
                        ]}
                        onClick={(e) => console.log(e)}
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