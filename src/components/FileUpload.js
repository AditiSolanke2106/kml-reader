import React from "react";

const FileUploader = ({ onFileUpload }) => {
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      onFileUpload(e.target.result);
    };
    reader.readAsText(file);
  };

  return (
    <div>
      <input  type="file" accept=".kml" onChange={handleFileChange} />
    </div>
  );
};

export default FileUploader;
