import React, { useState } from 'react';
import CommentDisplay from '../CommentDisplay';
import './CommentList.css'; // Import your specific CSS for this component

function CommentList({ comments }) {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    setIsVisible(prevState => !prevState);
  };

  return (
    <div className="comments-container p-3">
      <h4>
        Comments
        <button className="toggle-button" onClick={toggleVisibility}>
          {isVisible ? 'Hide Comments' : 'Show Comments'}
        </button>
      </h4>
      {isVisible && (
        <div className="comments-list">
          {comments && comments.length > 0 ? (
            comments.map((comment, index) => (
              <CommentDisplay key={index} comment={comment} />
            ))
          ) : (
            <p>No comments available</p>
          )}
        </div>
      )}
    </div>
  );
}

export default CommentList;
