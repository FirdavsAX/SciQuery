import React, { useState } from "react";
import { useFetch } from "../../hooks/useFetch";
import { useParams } from "react-router-dom";
import { API_BASE_URL } from "../../../config/Constants";
import Spinner from "../../Spinner/Spinner";
import "./QuestionDetail.css";

function QuestionDetail() {
  const id = useParams();
  const url = API_BASE_URL + "questions/" + id.id;
  const { data: fullQuestion, isPending, error } = useFetch(url);

  return (
    <div>
      {isPending && <Spinner />}
      {error && <h3>{error}</h3>}

      {fullQuestion && (
        <div className="question-detail">
            
          <h2>{fullQuestion.title || "No title available"}</h2>
          <hr />
          {fullQuestion.images}
          <div className="d-flex justify-content-between align-items-center">
            {fullQuestion.image && <img src={fullQuestion.image}></img>}
            <p>{fullQuestion.body || "No body available"}</p>
          </div>

          <p>
            Created Date:{" "}
            {new Date(fullQuestion.createdDate).toLocaleDateString()}
          </p>
          <p>
            Updated Date:{" "}
            {new Date(fullQuestion.updatedDate).toLocaleDateString()}
          </p>
          <h2>Comments</h2>
          <ul>
            {fullQuestion.comments && fullQuestion.comments.length > 0 ? (
              fullQuestion.comments.map((comment) => (
                <li key={comment.id}>
                  <p>{comment.body || "No comment body"}</p>
                  <p>User ID: {comment.userId || "Unknown user"}</p>
                </li>
              ))
            ) : (
              <li>No comments available</li>
            )}
          </ul>
          <h4>Answers</h4>
          <ul>
            {fullQuestion.answers && fullQuestion.answers.length > 0 ? (
              fullQuestion.answers.map((answer) => (
                <li key={answer.id}>
                  <p>{answer.body || "No comment body"}</p>
                  <p>User ID: {answer.userId || "Unknown user"}</p>
                </li>
              ))
            ) : (
              <li>No answers available</li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
}

export default QuestionDetail;
