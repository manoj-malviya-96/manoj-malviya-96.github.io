import {Toast} from 'primereact/toast';
import {FileUpload} from 'primereact/fileupload';
import React, {useRef} from 'react';

interface AtomFileUploadProps {
    acceptTypes: string;
    onFileChange: (fileUrl: string) => void;
}

const AtomFileUpload: React.FC<AtomFileUploadProps> = ({
                                                           acceptTypes,
                                                           onFileChange
                                                       }) => {
    const toast = useRef<Toast>(null);
    
    const showToast = (type: 'info' | 'error', summary: string, detail: string) => {
        if (toast.current) {
            toast.current.show({severity: type, summary, detail});
        }
    };
    
    const handleFileUpload = (event: any) => {
        const file = event.files?.[0]; // Get the first selected file
        if (file) {
            const fileUrl = URL.createObjectURL(file); // Convert
                                                       // the file
                                                       // to a URL
            onFileChange(fileUrl); // Pass the file to the provided
                                   // callback
            showToast('info', 'File Selected', `You selected: ${file.name}`);
        }
    };
    
    const onUpload = () => {
        showToast('info', 'Success', 'File uploaded successfully!');
    };
    
    const onError = () => {
        showToast('error', 'Error', 'File upload failed.');
    };
    
    return (
        <div className="card flex justify-content-center">
            <Toast ref={toast}/>
            <FileUpload
                mode="basic"
                name="demo[]"
                url="/api/upload"
                accept={acceptTypes}
                maxFileSize={1000000}
                onUpload={onUpload}
                onError={onError}
                customUpload
                uploadHandler={handleFileUpload} // Handle file
                                                 // selection
                                                 // manually
            />
        </div>
    );
};

export default AtomFileUpload;
