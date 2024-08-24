import React, { useEffect, useState } from "react";
import "./CommentList.css"; // Import your specific CSS for this component
import { useFetch } from "../../../hooks/useFetch";
import CommentDisplay from "../CommentDisplay";
function CommentList({ postId, postType }) {
  const url = `comments?postId=${[postId]}&postType=${postType}`;
  const { data : paginatedList , isPending, error } = useFetch(url);
  const [isVisible, setIsVisible] = useState(false);
  const comments = paginatedList && paginatedList.data;
  const toggleVisibility = () => {
    setIsVisible((prevState) => !prevState);
  };
  return (
    <div className="comments-container p-3">
      <h4>
        Comments
        <button className="toggle-button" onClick={toggleVisibility}>
          {isVisible ? "Hide Comments" : "Show Comments"}
        </button>
      </h4>
      {isPending ? (
        <p>Loading comments...</p>
      ) : error ? (
        <p>Error fetching comments</p>
      ) : (
        <div className="comments-list">
          {isVisible && (
            comments.length >= 0 ? 
            (
              comments.map((comment, index) => (
                <CommentDisplay key={index} comment={comment} />
              ))
            ) : (
              <p>No comments available</p>
            )
          )}
        </div>
      )}
    </div>
  );
}
export default CommentList;
