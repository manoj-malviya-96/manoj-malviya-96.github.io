import React from "react";
import {useToast} from "../providers/toast-provider";

interface AtomFileUploadProps {
    acceptTypes: string;
    onFileChange: (fileUrl: string) => void;
}

const _AtomFileUpload: React.FC<AtomFileUploadProps> = ({
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
                addToast(`File uploaded: ${file.name}`, "success");
            } else {
                addToast("No file selected. Please try again.", "error");
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
};

const AtomFileUpload = React.memo(_AtomFileUpload);

export default AtomFileUpload;
