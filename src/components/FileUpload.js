// src/components/FileUploader.js
import React from 'react';

const FileUploader = ({ onFileUpload }) => {
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const parser = new DOMParser();
      const xmlDoc = parser.parseFromString(e.target.result, 'text/xml');

      if (xmlDoc.getElementsByTagName("parsererror").length) {
        alert("Invalid KML file. Please upload a valid KML file.");
        return;
      }

      onFileUpload(xmlDoc);
    };
    reader.readAsText(file);
  };

  return <input type="file" accept=".kml" onChange={handleFileChange} />;
};
export default FileUploader;