import React, { useEffect, useState } from "react";
import "./CommentList.css"; // Import your specific CSS for this component
import { useFetch } from "../../../hooks/useFetch";
import CommentDisplay from "../CommentDisplay";
function CommentList({ comments }) {
  const [isVisible, setIsVisible] = useState(false);
  const toggleVisibility = () => {
    setIsVisible((prevState) => !prevState);
  };
  return (
    <div className="comments-container p-3">
      <h4>
        Fikrlar
        <button className="toggle-button" onClick={toggleVisibility}>
          {isVisible ? "Hide Comments" : "Show Comments"}
        </button>
      </h4>

      <div className="comments-list">
        {isVisible &&
          (comments.length >= 0 ? (
            comments.map((comment, index) => (
              <CommentDisplay key={index} comment={comment} />
            ))
          ) : (
            <p>No comments available</p>
          ))}
      </div>
  </div>
  );
}
export default CommentList;
