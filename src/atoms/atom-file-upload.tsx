import React from "react";
import {useToast} from "../providers/toasts";
import {ToastSeverity} from "./atom-toast";

interface AtomFileUploadProps {
    acceptTypes: string;
    onFileChange: (fileUrl: string) => void;
}

const AtomFileUpload: React.FC<AtomFileUploadProps> = React.memo(({
                                                                      acceptTypes,
                                                                      onFileChange,
                                                                  }) => {
    const {addToast} = useToast();
    
    const handleFileUpload =
        (event: React.ChangeEvent<HTMLInputElement>) => {
            const file = event.target.files?.[0];
            
            if (file) {
                // Generate URL for the uploaded file
                const fileUrl = URL.createObjectURL(file);
                onFileChange(fileUrl);
                addToast(`File uploaded: ${file.name}`, ToastSeverity.Success);
            } else {
                addToast("No file selected. Please try again.", ToastSeverity.Error);
            }
        };
    
    return (
        <input
            type="file"
            onChange={handleFileUpload}
            accept={acceptTypes}
            className="file-input file-input-bordered file-input-sm w-full max-w-xs"
        />
    );
});
export default AtomFileUpload;
