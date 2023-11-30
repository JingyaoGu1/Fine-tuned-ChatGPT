import React, { useState, useEffect } from 'react';
import axios from 'axios';

const FileList = () => {
  const [files, setFiles] = useState([]);

  // Fetch files when the component mounts
  useEffect(() => {
    const fetchFiles = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:5000/files');
        setFiles(response.data);
      } catch (error) {
        console.error('Error fetching files:', error);
      }
    };

    fetchFiles();
  }, []);

  // Function to clear all files
  const clearFiles = async () => {
    try {
      await axios.post('http://127.0.0.1:5000/clear-files');
      setFiles([]);  // Clear the local file list state
      alert('All files have been cleared.');
    } catch (error) {
      console.error('Error clearing files:', error);
    }
  };

  return (
    <div>
      <h3>Uploaded Files</h3>
      {files.length > 0 ? (
        <div>
          <ul>
            {files.map((file, index) => (
              <li key={index}>{file}</li>
            ))}
          </ul>
          <button onClick={clearFiles}>Clear Files</button>
        </div>
      ) : (
        <p>No files uploaded.</p>
      )}
    </div>
  );
};

export default FileList;
