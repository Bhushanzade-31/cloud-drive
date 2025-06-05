import React, { useState } from "react";
import Button from "@mui/material/Button";
import AddToDriveIcon from "@mui/icons-material/AddToDrive";
import AppData from './appdata';
import "./appbar.css";
import { useNavigate } from "react-router-dom";


const MenuAppBar = ({ user }) => {
  const [loading, setLoading] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadedImageData, setUploadedImageData] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
      setUploadedImageData(null); 
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    
    
    if (!selectedFile) {
      alert("Please select a file");
      return;
    }

   
    setLoading(true);

    const formData = new FormData();
    formData.append("file", selectedFile);
    formData.append("upload_preset", "first_time_using_cloudinary");
    formData.append("cloud_name", "dvhziwrqo");

    try {
      // Upload data to Cloudinary
      const res = await fetch("https://api.cloudinary.com/v1_1/dvhziwrqo/image/upload", {
        method: "POST",
        body: formData,
      });

      const uploaded = await res.json();

      if (!uploaded.secure_url) {
        throw new Error("Upload failed. Try again.");
      }

      setUploadedImageData(uploaded);
      setSelectedFile(null);

      // Send to backend
      const token = localStorage.getItem("token");
      const response = await fetch("http://localhost:4000/users/upload-url", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`, 
        },
        body: JSON.stringify({
         
          imageUrl: uploaded.secure_url,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Failed to update user image");
      }

    } catch (error) {
      console.error("Upload failed:", error);
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleClosePopup = () => {
    setShowPopup(false);
    setSelectedFile(null);
    setUploadedImageData(null);
  };

  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };
   
  
    const handleRefresh = () => {
    
        window.location.reload();
     
    };


  return (
    <>
    <div>
         <div className="button">
        <AddToDriveIcon />
        <Button variant="contained" onClick={() => setShowPopup(true)}>
          Add File
        </Button>
        <div className="logout">
          <Button variant="contained" onClick={handleLogout}>
            Logout</Button>
        </div>
      </div>

      {showPopup && (
        <div className="pop">
          <form onSubmit={handleSubmit} encType="multipart/form-data">
            <label htmlFor="dropzone-file" className="dropzone">
              {loading ? (
                "Uploading..."
              ) : (
                <>
                  <p><strong>Click to upload</strong> or drag and drop</p>
                  <p>SVG, PNG, JPG, or GIF (Max 800x400px)</p>
                </>
              )}
              <input
                type="file"
                id="dropzone-file"
                accept="image/*"
                hidden
                onChange={handleFileChange}
              />
            </label>

            <div className="popup-buttons">
              <Button variant="outlined" onClick={handleClosePopup}>
                Close
              </Button>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                disabled={loading}
                
              >
                {loading ? "Uploading..." : "Upload"}
              </Button>
            </div>
          </form>
        </div>
      )}
</div>

      {uploadedImageData?.secure_url && (
        <p  >
          Uploaded to:{" "}
          <a
            href={uploadedImageData.secure_url}
            target="_blank"
            rel="noreferrer"
            className="upload-link"
          >
          
          </a>
        </p>
      )}


         <AppData />
         <Button 
         className="refresh"
         variant="outlined" 
         onClick={handleRefresh}>
                refresh
          </Button>
    </>
  );
};

export default MenuAppBar;
