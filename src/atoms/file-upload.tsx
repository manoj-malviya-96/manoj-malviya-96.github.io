
const FileUpload = ({acceptTypes, onFileChange }) => {
    return (
        <input type="file" accept={acceptTypes}  className="file-input
        file-input-bordered file-input-primary w-fit max-w-xs" onChange={onFileChange} />
    );
}

export default FileUpload;