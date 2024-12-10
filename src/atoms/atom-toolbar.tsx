import {Toolbar, ToolbarProps} from 'primereact/toolbar';
import React from "react";

interface AtomToolbarProps {
    start?: React.ReactNode | ((props: ToolbarProps) => React.ReactNode);
    center?: React.ReactNode | ((props: ToolbarProps) => React.ReactNode);
    end?: React.ReactNode | ((props: ToolbarProps) => React.ReactNode);
    className?: string;
}

const AtomToolbar: React.FC<AtomToolbarProps> = ({
                                                     start,
                                                     center,
                                                     end,
                                                     className
                                                 }) => {
    const stylePt = {
        root: {
            style: {
                backgroundColor: 'transparent',
                position: 'fixed',
                top: 0,
                left: 0,
                borderRadius: 0,
                width: '100%',
                height: 'content-fit',
                padding: 8,
                border: 'none',
            }
        },
        end: {
            style: {
                marginRight: '8px',
            }
        },
        start: {
            style: {
                marginLeft: '8px',
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


