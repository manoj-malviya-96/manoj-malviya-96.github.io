import React, {ReactNode} from 'react';
import {Element} from 'react-scroll';

interface FullScreenPageProps {
    name: string;
    title?: string;
    children?: ReactNode;
    childrenAlignment?: string; // Example: 'justify-center
                                // items-center'
    backgroundImage?: string;
}

const _AtomFullScreenContainer: React.FC<FullScreenPageProps> = ({
                                                           name,
                                                           title,
                                                           children,
                                                           childrenAlignment,
                                                           backgroundImage,
                                                       }) => {
    if (!name) {
        throw new Error("The 'name' prop is required for FullScreenPage.");
    }
    
    const alignmentClasses = childrenAlignment
                             ? `flex ${childrenAlignment}`
                             : 'flex justify-center items-center';
    
    return (
        <Element
            className="h-fit min-h-screen w-screen flex flex-col p-0 m-0 overflow-clip justify-center"
            name={name}
            style={{
                margin: 0, // Remove margin
                padding: 0, // Remove padding
                backgroundImage: backgroundImage ? `url(${backgroundImage})` : undefined,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
            }}
        >
            {/* Title */}
            {title && (
                <h2 className="text-3xl text-center uppercase font-extrabold mt-16">
                    {title}
                </h2>
            )}
            {/* Children */}
            {children && (
                <div
                    className={`p-4 w-full h-fit m-auto ${alignmentClasses}`}>
                    {children}
                </div>
            )}
        </Element>
    );
};

const AtomFullScreenContainer = React.memo(_AtomFullScreenContainer);
export default AtomFullScreenContainer;
