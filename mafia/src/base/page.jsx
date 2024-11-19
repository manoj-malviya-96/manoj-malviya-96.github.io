import { Element } from 'react-scroll';

const FullScreenPage = ({ name, title, children, backgroundImage }) => {
    if (!name) {
        throw new Error("The 'name' prop is required for FullScreenPage.");
    }

    return (
        <Element
            className={`h-screen w-screen flex flex-col items-center justify-center`}
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
                <h2 className="text-3xl font-bold text-center mb-8 bg-opacity-75 p-4 rounded">
                    {title}
                </h2>
            )}
            {/* Children */}
            {children && (
                <div className="w-full p-4 flex justify-center items-center">
                    {children}
                </div>
            )}
        </Element>
    );
};

export default FullScreenPage;
