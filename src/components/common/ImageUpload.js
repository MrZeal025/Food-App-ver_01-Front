import React, { useState } from "react";

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
      return <img key={i} src={photo} alt="" height="100" width="150" />;
    });
  };

  return (
    <div className="mb-2">
        <h6>Select a photo</h6>
        <input type="file" id="file" onChange={handleImageChange} />
        <div>{renderPhotos(selectedFiles)}</div>
    </div>
  );
};

export default ImageUpload;
