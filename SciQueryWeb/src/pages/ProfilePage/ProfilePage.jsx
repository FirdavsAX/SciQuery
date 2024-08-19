import React, { useState } from "react";
import "./ProfilePage.css";
import { useFetch } from "../../components/hooks/useFetch";
import { useUserIdFromToken } from "../../components/hooks/useUserIdFromToken";
import { useUpdate } from "../../components/hooks/useUpdate";
import { useCreate } from "../../components/hooks/useCreate";

const ProfilePage = () => {
  const token = window.localStorage.getItem("token");
  const { userId } = useUserIdFromToken(token);
  const { data: user, isPending } = useFetch(userId ? `users/${userId}` : null);
  
  const { uploadImage } = useCreate("users/");
  const { update } = useUpdate(`users/${user && user.id}`);
  
  const [imageFile, setImageFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState(null);

  // Handle image file selection
  const handleFileChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  // Handle image upload
  const handleUpload = async () => {
    try {
      const images = [];
      images.push(imageFile);
      
      setUploading(true);
      const imagePath  = await uploadImage(images, "users/upload-image");
      user.ImagePath = imagePath[0];
      await update(user);
     
      setUploading(false);
    } catch (error) {
      setUploadError("Error uploading image. Please try again.");
      console.log(error);
      setUploading(false);
    }
  };

  if (isPending) return <div>Loading...</div>;

  return (
    <div className="profile-container">
      <div className="profile-image">
        {user && user.image && (
          <div className="mb-4">
            <img
              src={`data:${user.image.contentType};base64,${user.image.bytes}`}
              alt={user?.userName || "User"}
            />
          </div>
        )}
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          disabled={uploading}
        />
        {uploadError && <div className="error-message">{uploadError}</div>}
      </div>
        <button onClick={handleUpload} disabled={uploading}>
          {uploading ? "Uploading..." : "Upload Image"}
        </button>
      <div className="profile-details">
        <h1 className="profile-name">{user?.userName || "Unknown User"}</h1>
        <p className="profile-reputation">
          Reputation: {user?.reputation || "N/A"}
        </p>
        <div className="profile-stats">
          <p>Posts: {user?.postsCount || 0}</p>
          <p>Followers: {user?.followersCount || 0}</p>
          <p>Following: {user?.followingCount || 0}</p>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
