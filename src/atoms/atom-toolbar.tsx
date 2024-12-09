import {Toolbar, ToolbarProps} from 'primereact/toolbar';
import React from "react";
import {useTheme} from "../main/theme";
import {classNames} from "primereact/utils";

interface AtomToolbarProps {
    start?: React.ReactNode | ((props: ToolbarProps) => React.ReactNode);
    center?: React.ReactNode | ((props: ToolbarProps) => React.ReactNode);
    end?: React.ReactNode | ((props: ToolbarProps) => React.ReactNode);
    className?: string;
}

const AtomToolbar: React.FC<AtomToolbarProps> = ({start, center, end, className}) => {
    // const {daisyPrimary, daisyNeutral} = useTheme();

    const stylePt = {
        root: {
            className: classNames('p-toolbar', className),
            style: {
                backgroundColor: 'transparent',
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100%',
                height: 'content-fit',
                padding: 4,
                border: 'none',
                backdropFilter: 'blur(10px)',
            }
        },
        end: {
            style: {
                backgroundColor: 'transparent',
            }
        }
    };


    return (
        <Toolbar
            className={className}
            start={start}
            center={center}
            end={end}
            pt={stylePt}
        />
    );
}

export default AtomToolbar;


