import React, { useState } from 'react';

const FileUpload = ({ onFileSelect }) => {
    const [previewUrl, setPreviewUrl] = useState('');
    const [file, setFile] = useState(null);

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile) {
            setFile(selectedFile);
            const url = URL.createObjectURL(selectedFile);
            setPreviewUrl(url);
            onFileSelect(selectedFile);
        }
    };

    const handleRemove = () => {
        setFile(null);
        setPreviewUrl('');
        URL.revokeObjectURL(previewUrl);
    };

    return (
        <div className="upload-container">
            <label className="upload-btn" tabIndex={0}>
                Choose Report (PDF/Image)
                <input
                    type="file"
                    accept=".pdf,.jpg,.jpeg,.png"
                    onChange={handleFileChange}
                    className="hidden"
                    aria-label="Upload a lab report as PDF or image"
                />
            </label>

            {previewUrl && (
                <div className="preview-section">
                    {file.type.startsWith('image/') ? (
                        <img src={previewUrl} alt="Report preview" className="preview-image" />
                    ) : (
                        <embed
                            src={previewUrl}
                            type="application/pdf"
                            width="300"
                            height="400"
                            className="preview-image"
                        />
                    )}
                    <button onClick={handleRemove} className="remove-btn">
                        Remove
                    </button>
                </div>
            )}
        </div>
    );
};

export default FileUpload;
