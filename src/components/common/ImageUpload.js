import React, { useState } from "react";
import { MdCloudUpload } from 'react-icons/md';

const ImageUpload = props => {

  const { getImageFromUploads } = props
  const [previewSource, setPreviewSource] = useState([]);

  const handleImageChange = (e) => {
    e.preventDefault();
    if (e.target.files) { 

      const getImageFileName = Array.from(e.target.files).map((file) => { return file.name });
      Array.from(e.target.files).map((file) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
          setPreviewSource((prev) => prev.concat(reader.result));
          getImageFromUploads(getImageFileName, reader.result);
        }
      });
    }
  };

  const renderPhotos = (source) => {
    return source.map((photo, i) => {
      return <img className="m-2" key={i} src={photo} alt="" height="150" width="200" />;
    });
  };

  return (
    <div className="imgUploadDiv mb-2">
        <MdCloudUpload className="uploadIcon"/>
        <input className="customButtonFormat buttonColorGray" type="file" id="file" onChange={handleImageChange} multiple/>
        <div>{renderPhotos(previewSource)}</div>
    </div>
  );
};

export default ImageUpload;
