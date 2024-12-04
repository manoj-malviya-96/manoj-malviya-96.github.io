const RadialProgress = ({progress, className}) => {
    return (
        <div className={`radial-progress text-white ${className}`} style={{ "--value": progress }} role="progressbar">
            {progress}%
        </div>)
}

export default RadialProgress;