import React, { useState, useEffect } from "react";
import "./ProfilePage.css";
import { useFetch } from "../../components/hooks/useFetch";
import { useUserIdFromToken } from "../../components/hooks/useUserIdFromToken";
import { useUpdate } from "../../components/hooks/useUpdate";
import { useCreate } from "../../components/hooks/useCreate";
import { Outlet } from "react-router-dom";

const ProfilePage = () => {
  const token = window.localStorage.getItem("token");
  const { userId } = useUserIdFromToken(token);
  const { data: user, isPending } = useFetch(userId ? `users/${userId}` : null);

  const { uploadImage } = useCreate("users/");
  const { update } = useUpdate(`users/${user?.id}`);

  const [imageFile, setImageFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [newUserName, setNewUserName] = useState("");

  const [showPosts, setShowPosts] = useState(false);

  useEffect(() => {
    if (user) {
      setNewUserName(user.userName); // Set the initial username when the user data is fetched
    }
  }, [user]);

  // Handle image file selection
  const handleFileChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  // Handle image upload and profile update
  const handleUpload = async () => {
    if (!imageFile && !newUserName) return;

    try {
      setUploading(true);

      let updatedUser = { ...user };
      if (imageFile) {
        const images = [imageFile];
        const imagePath = await uploadImage(images, "users/upload-image");
        updatedUser = {
          ...updatedUser,
          ImagePath: imagePath[0],
          image: { ...user.image },
        };
      }

      if (newUserName && newUserName !== user.userName) {
        updatedUser = { ...updatedUser, userName: newUserName };
      }

      await update(updatedUser);
      setUploading(false);
      setImageFile(null);
      setIsEditing(false);
      window.location.reload();
    } catch (error) {
      setUploadError("Error updating profile. Please try again.");
      console.error(error);
      setUploading(false);
    }
  };

  if (isPending) return <div className="loading">Loading...</div>;

  return (
    <div className="profile-container">
      <div>
        <div className="profile-header">
          <div>
            <div className="profile-image-wrapper">
              {user?.image && (
                <img
                  src={`data:${user.image.contentType};base64,${user.image.bytes}`}
                  alt={user?.userName || "User"}
                  className="profile-picture"
                />
              )}
              {/* Input fields for image upload and username editing */}
            </div>
            <div className="edit-button">
              <button onClick={() => setIsEditing(!isEditing)}>Edit</button>
            </div>
          </div>

          <div className="profile-info">
            <h1 className="profile-name">{user?.userName || "Unknown User"}</h1>
            <p className="profile-reputation">
              Reputation: {user?.reputation || "N/A"}
            </p>
            <div className="profile-stats">
              <div className="stat-item">
                <span
                  className="stat-value"
                  onClick={() => setShowPosts(!showPosts)}
                  style={{ cursor: "pointer" }}
                >
                  {user?.postsCount || 0}
                </span>
                <span className="stat-label">Posts</span>
              </div>
              <div className="stat-item">
                <span className="stat-value">{user?.followersCount || 0}</span>
                <span className="stat-label">Followers</span>
              </div>
              <div className="stat-item">
                <span className="stat-value">{user?.followingCount || 0}</span>
                <span className="stat-label">Following</span>
              </div>
            </div>
          </div>
        </div>
        {isEditing && (
          <div className="edit-form">
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              disabled={uploading}
              className="file-input"
            />
            <input
              type="text"
              value={newUserName}
              onChange={(e) => setNewUserName(e.target.value)}
              placeholder="Edit username"
              className="username-input"
            />
            {uploadError && <div className="error-message">{uploadError}</div>}
            <button
              onClick={handleUpload}
              disabled={uploading}
              className="save-button"
            >
              {uploading ? "Saving..." : "Save Changes"}
            </button>
          </div>
        )}
      </div>

      {showPosts && (
        <div className="posts-list">
          {/* Render user's posts here */}
          <h2>User's Posts</h2>
          {/* Replace with actual posts fetching and rendering logic */}
        </div>
      )}

      <div className="profile-content">
        <Outlet /> {/* Outlet for nested routes */}
      </div>
    </div>
  );
};

export default ProfilePage;
