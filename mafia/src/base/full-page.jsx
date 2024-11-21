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
            className="h-screen w-screen flex flex-col justify-center items-center"
            name={name}
            style={{
                backgroundImage: backgroundImage ? `url(${backgroundImage})` : undefined,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
            }}
        >
            {/* Title */}
            {title && (
                <h2 className="text-3xl font-bold text-center mb-4">
                    {title}
                </h2>
            )}
            {/* Children */}
            {children && (
                <div className={`w-3/4 h-3/4 ${alignmentClasses}`}>
                    {children}
                </div>
            )}
        </Element>
    );
};

export default FullScreenPage;
