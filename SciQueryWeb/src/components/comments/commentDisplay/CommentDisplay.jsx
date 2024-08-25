// CommentDisplay.js
import React from "react";
import "./CommentDisplay.css";
import UserDetail from "../../User/UserMini/UserDetail";

function CommentDisplay({ comment }) {
  return (
    <div className="comment-item">
      <div className="comment-header">
        <UserDetail
          user={comment.user}
          updatedDate={comment.updatedDate}
          createdDate={comment.createdDate}
        />
      </div>
      <p className="comment-body">{comment.body || "No comment body"}</p>
    </div>
  );
}

export default CommentDisplay;
