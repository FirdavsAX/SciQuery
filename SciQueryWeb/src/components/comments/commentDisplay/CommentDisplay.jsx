// CommentDisplay.js
import React from "react";
import defaultProfileImage from "../../../../public/user.png"; // Make sure to replace with actual path
import './CommentDisplay.css'

function CommentDisplay({ comment }) {
  const userProfileImage = comment.user.profileImage || defaultProfileImage;

  return (
    <div className="comment-item">
      <div className="comment-header">
        <img
          src={userProfileImage}
          alt={`${comment.user && comment.user.userName}'s profile`}
          className="profile-image"
        />
        <p className="username">{comment.user.userName || "Anonymous"}</p>
      </div>
      <p className="comment-body">{comment.body || "No comment body"}</p>
    </div>
  );
}

export default CommentDisplay;
