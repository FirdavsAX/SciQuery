import React, { useState } from 'react';
import axios from 'axios';

const ImageDownload = () => {
  const [fileName, setFileName] = useState('');

  const handleFileNameChange = (e) => {
    setFileName(e.target.value);
  };

  const handleDownload = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/image/download?fileName=${fileName}`, {
        responseType: 'blob',
      });

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', fileName);
      document.body.appendChild(link);
      link.click();
    } catch (error) {
      console.error('Error downloading file', error);
    }
  };

  return (
    <div>
      <input type="text" value={fileName} onChange={handleFileNameChange} placeholder="Enter file name" />
      <button onClick={handleDownload}>Download</button>
    </div>
  );
};

export default ImageDownload;

