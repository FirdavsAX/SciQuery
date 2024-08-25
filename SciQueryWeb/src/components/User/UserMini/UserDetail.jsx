import React from "react";
import "./UserDetail.css";
import { NavLink } from "react-router-dom";

function UserDetail({ user, createdDate, updatedDate }) {
  const timeAgo = (date) => {
    const now = new Date();
    const seconds = Math.floor((now - new Date(date)) / 1000);
    let interval = Math.floor(seconds / 31536000);

    if (interval >= 1) {
      return `${interval} yil oldin`;
    }
    interval = Math.floor(seconds / 2592000);
    if (interval >= 1) {
      return `${interval} oy oldin`;
    }
    interval = Math.floor(seconds / 86400);
    if (interval >= 1) {
      return `${interval} kun oldin`;
    }
    interval = Math.floor(seconds / 3600);
    if (interval >= 1) {
      return `${interval} soat oldin`;
    }
    interval = Math.floor(seconds / 60);
    if (interval >= 1) {
      return `${interval} daqiqa oldin`;
    }
    return "hozirgina";
  };
  return (
    <NavLink to={`/profile/${user.id}`}>
      <div className="user-detail">
        <div className="user-info">
          {user && user.image && (
            <div className="mb-4">
              <img
                className="user-image"
                src={`data:${user.image.contentType};base64,${user.image.bytes}`}
                alt={user?.userName || "User"}
              />
            </div>
          )}
          <p className="user-name">{user?.userName || "Unknown user"} &nbsp;</p>
          <p className="user-dates">
            {createdDate < updatedDate ? (
              <>o'zgartirdi: {timeAgo(updatedDate)}</>
            ) : (
              <>yaratdi: {timeAgo(createdDate)}</>
            )}
          </p>
        </div>
      </div>
    </NavLink>
  );
}

export default UserDetail;
