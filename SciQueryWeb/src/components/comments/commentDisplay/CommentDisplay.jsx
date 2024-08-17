import React from "react";
import "./CommentDisplay.css";

const CommentDisplay = ({ comment }) => {
  return (
    <div className="comment">
      <p><em>{comment}</em></p>
    </div>
  );
};

export default CommentDisplay;