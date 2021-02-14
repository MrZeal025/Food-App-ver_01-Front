import React, { useState } from "react";
import { MdCloudUpload } from 'react-icons/md';

const ImageUpload = props => {

  const { getImageFromUploads } = props
  const [previewSource, setPreviewSource] = useState();

  const handleImageChange = (e) => {
    e.preventDefault();
    if (e.target.files) { 
      const getImageFileName = Array.from(e.target.files).map((file) => { return file.name });
      previewFile(e.target.files[0], getImageFileName);
    }
  };

  const previewFile = (file, getImageFileName) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setPreviewSource(reader.result);
      getImageFromUploads(getImageFileName, reader.result);
    }
  }

  return (
    <div className="imgUploadDiv mb-2">
        <MdCloudUpload className="uploadIcon"/>
        <input className="customButtonFormat buttonColorGray" type="file" id="file" onChange={handleImageChange} multiple/>
        { previewSource && <img src={previewSource} alt="Preview" className="m-2" height="150" width="200" /> }
    </div>
  );
};

export default ImageUpload;
