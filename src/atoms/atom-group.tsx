import React from 'react'


interface AtomGroupProps {
    label?: string;
    children: React.ReactNode;
    layout?: 'horizontal' | 'vertical';
    className?: string;
}

const AtomGroup: React.FC<AtomGroupProps> = ({label, children, layout = 'vertical', className = ''}) => {
    return (
        <div className="w-full flex flex-col gap-1">
            {label && <label className="text-xs text-accent">{label}</label>}
            <div
                className={`flex flex-${layout === 'vertical' ? 'col' : 'row'}
                        gap-4 p-3 rounded-md hover:shadow
                        bg-transparent
                        border border-accent border-opacity-50
                        backdrop-blur-lg w-full h-fit
                        justify-center items-center
                        ${className}`}>
                {children}
            </div>
        </div>
    );
};

export default AtomGroup;