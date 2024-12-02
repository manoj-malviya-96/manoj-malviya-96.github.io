const ScrollContainer = ({className, children}) => {
    return (
        <div className={`w-full h-full ${className}
            overflow-scroll scrollbar-thin scrollbar-thumb-gray-500 scrollbar-track-gray-100`}
             >
            {children}
        </div>);
};
export default ScrollContainer;