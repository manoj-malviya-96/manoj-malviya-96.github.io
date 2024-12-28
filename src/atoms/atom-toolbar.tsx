import React from "react";

interface AtomToolbarProps {
    start?: React.ReactNode;
    center?: React.ReactNode;
    end?: React.ReactNode;
    className?: string;
}

const AtomToolbar: React.FC<AtomToolbarProps> = React.memo(({
                                                                start,
                                                                center,
                                                                end,
                                                                className = "",
                                                            }) => {
    return (
        <div
            className={`flex items-center justify-between fixed top-0 left-0 w-full
                        p-2 bg-transparent z-20 ${className}`}
        >
            <div className="flex items-center space-x-2">{start}</div>
            {center && <div className="flex items-center justify-center">{center}</div>}
            <div className="flex items-center space-x-2">{end}</div>
        </div>
    );
});
export default AtomToolbar;
