import { Element } from 'react-scroll';

const FullScreenPage = ({ name, title, children, childrenAlignment, backgroundImage }) => {
    if (!name) {
        throw new Error("The 'name' prop is required for FullScreenPage.");
    }

    const alignmentClasses = childrenAlignment
        ? `flex ${childrenAlignment}`
        : 'flex justify-center items-center';

    return (
        <Element
            className="h-fit min-h-screen w-screen flex flex-col justify-center items-center overflow-clip"
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
                <h2 className="text-3xl text-center mt-4 uppercase font-extrabold">
                    {title}
                </h2>
            )}
            {/* Children */}
            {children && (
                <div className={`p-8 w-full h-fit ${alignmentClasses}`}>
                    {children}
                </div>
            )}
        </Element>
    );
};

export default FullScreenPage;
