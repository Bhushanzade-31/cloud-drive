import React, { useState, useEffect } from "react";
import "./appdata.css";

const AppData = () => {
  const [userImages, setUserImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedImage, setSelectedImage] = useState(null); 
  
  useEffect(() => {
    const fetchUserImages = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch("http://localhost:4000/users/user", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const result = await response.json();
        setUserImages(result); 
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUserImages();
  }, []);

  if (loading) {
    return <div>Loading images...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h2>Uploaded Images:</h2>
      {userImages.length > 0 ? (
        <div className="image-gallery">
          {userImages.map((url, index) => (
            <img
              key={index}
              src={url}
              alt={`User image ${index}`}
              className="user-image"
              onClick={() => setSelectedImage(url)}
            />
          ))}
        </div>
      ) : (
        <p>No images available</p>
      )}

     
      {selectedImage && (
        <div className="modal" onClick={() => setSelectedImage(null)}>
          <img src={selectedImage} alt="Full size" className="modal-image" />
        </div>
      )}
    </div>
  );
};

export default AppData;
