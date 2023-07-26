import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function PickImage() {
  const [selectedFile, setSelectedFile] = useState(null);
  const navigate = useNavigate();

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
    navigate('/edit-image', { state: { selectedFile: file } });
  };

  console.log(selectedFile);

  return (
    <div className="flex flex-col bg-red-200 items-center mt-10">
      <label htmlFor="file-input" className="cursor-pointer bg-[#00b2e8] px-4 py-2 text-white rounded-md">
        Select Image or Video
      </label>
      <input
        type="file"
        id="file-input"
        accept="image/*, video/*" // Accept both image and video files
        className="hidden"
        onChange={handleFileUpload}
      />
    </div>
  );
}

export default PickImage;
