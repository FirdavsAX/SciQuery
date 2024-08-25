import React from "react";
import "../ProfilePage.css";
import { useFetch } from "../../../components/hooks/useFetch";
import { useParams } from "react-router-dom";

const UserProfilePage = ({}) => {
  const { userId } = useParams();
  const { data: user } = useFetch(userId ? `users/${userId}` : null);

  return (
    <div className="profile-container">
      <div className="profile-image">
        {user?.image && (
          <img
            src={`data:${user.image.contentType};base64,${user.image.bytes}`}
            alt={user?.userName || "User"}
            className="profile-picture"
          />
        )}
      </div>

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

export default UserProfilePage;
