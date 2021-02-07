import React, { useState } from "react";
import { MdCloudUpload } from 'react-icons/md';

const ImageUpload = props => {

  const { getImageFromUploads } = props
  const [selectedFiles, setSelectedFiles] = useState([]);

  const handleImageChange = (e) => {
    e.preventDefault();
    
    if (e.target.files) { 
      // create a temporary rendering blob URL to display image for preview
      const filesArray = Array.from(e.target.files).map((file) => URL.createObjectURL(file));
      // get the file name from uploads array and return it
      const getImageFileName = Array.from(e.target.files).map((file) => { return file.name });
      // return the data to the parent component
      getImageFromUploads(getImageFileName, e.target.files[0]);
      // set the selected array
      setSelectedFiles((prevImages) => prevImages.concat(filesArray));
      // remove the URL created by the URL.createObjectURL
      Array.from(e.target.files).map(
          (file) => URL.revokeObjectURL(file) // avoid memory leak
      );
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
        <div>{renderPhotos(selectedFiles)}</div>
    </div>
  );
};

export default ImageUpload;
