import React from "react";
import HtmlParser from "html-react-parser";
import { useFetch } from "../../hooks/useFetch";
import { useParams } from "react-router-dom";
import { API_BASE_URL } from "../../../config/Constants";
import "bootstrap/dist/css/bootstrap.min.css";
import Spinner from "../../Spinner/Spinner";
import "./QuestionDetail.css";
import ImageContainer from "../../images/imageContainer/ImageContainer";
import RatingComponent from "../../ratingComponent/RatingComponent";
import CommentDisplay from "../../comments/commentDisplay/CommentDisplay";

function QuestionDetail() {
  const { id } = useParams();
  const url = `${API_BASE_URL}questions/${id}`;
  const { data: fullQuestion, isPending, error } = useFetch(url);
  const images =
    fullQuestion &&
    fullQuestion.images &&
    fullQuestion.images.map(
      (image) => `data:${image.contentType};base64,${image.bytes}`
    );

  return (
    <div className="question-container mt-4">
      {isPending && <Spinner />}
      {error && <div className="alert alert-danger">{error}</div>}

      {fullQuestion && (
        <div className="question-detail mx-auto p-4">
          <h2 className="mb-4">{fullQuestion.title || "No title available"}</h2>
          <hr />

          <div className="mb-4">
            {images && images.length > 0 ? (
              <ImageContainer images={images} />
            ) : (
              <p>No images available</p>
            )}
          </div>

          <div className="mb-4">
            <div>{HtmlParser(fullQuestion.body) || "No body available"}</div>
          </div>

          <div className="mb-4">
            <p>
              <strong>Created Date:</strong>{" "}
              {new Date(fullQuestion.createdDate).toLocaleDateString()}
            </p>
            <p>
              <strong>Updated Date:</strong>{" "}
              {new Date(fullQuestion.updatedDate).toLocaleDateString()}
            </p>
          </div>

          <div className="mb-4 comments-container">
            <h3>Comments</h3>
            {fullQuestion.comments && fullQuestion.comments.length > 0 ? (
              <div>
                {fullQuestion.comments.map((comment) => (
                  <CommentDisplay comment={comment}/>
                ))}
              </div>
            ) : (
              <p>No comments available</p>
            )}
          </div>

          <div className="mb-4">
            <h3>Answers</h3>
            {fullQuestion.answers && fullQuestion.answers.length > 0 ? (
              <ul className="list-unstyled">
                {fullQuestion.answers.map((answer) => (
                  <li key={answer.id} className="border-bottom pb-2 mb-2">
                    <p>{answer.body || "No answer body"}</p>
                    <p>
                      <strong>User ID:</strong>{" "}
                      {answer.userId || "Unknown user"}
                    </p>
                  </li>
                ))}
              </ul>
            ) : (
              <p>No answers available</p>
            )}
          </div>
        </div>
      )}
      <div>
        <RatingComponent
          votes={fullQuestion && fullQuestion.votes ? fullQuestion.votes : 0}
        />
      </div>
    </div>
  );
}

export default QuestionDetail;
