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
            className="h-fit min-h-screen w-screen flex flex-col p-0 m-0 overflow-clip"
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
                <div className={`p-8 w-full h-fit mt-4 ${alignmentClasses}`}>
                    {children}
                </div>
            )}
        </Element>
    );
};

export default FullScreenPage;
