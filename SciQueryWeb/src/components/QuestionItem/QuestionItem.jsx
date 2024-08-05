import React, { useEffect, useState, useCallback } from "react";
import { useFetch } from "../../hooks/useFetch";
import "./QuestionItem.css";

const QuestionItem = () => {
  const [url, setUrl] = useState("https://localhost:7008/api/Questions/12");
  const { data, isPending, error } = useFetch(url);

  return (
    <div>
      <h1>Question </h1>
      {isPending && (
        <div>
          <h3>Loading...</h3>
        </div>
      )}
      {error && (
        <div>
          <h3>{error}</h3>
        </div>
      )}
      {data && (
        <div className="question-container">
          <h2>{data.title || "No title available"}</h2>
          <p>{data.body || "No body available"}</p>
          <p>Created Date: {new Date(data.createdDate).toLocaleDateString()}</p>
          <p>Updated Date: {new Date(data.updatedDate).toLocaleDateString()}</p>
          <h2>Comments</h2>
          <ul>
            {data.comments && data.comments.length > 0 ? (
              data.comments.map((comment) => (
                <li key={comment.id}>
                  <p>{comment.body || "No comment body"}</p>
                  <p>User ID: {comment.userId || "Unknown user"}</p>
                </li>
              ))
            ) : (
              <li>No comments available</li>
            )}
          </ul>
          )
        </div>
      )}
    </div>
  );
};

export default QuestionItem;
