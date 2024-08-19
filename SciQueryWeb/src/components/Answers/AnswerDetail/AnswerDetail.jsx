import React from "react";
import "./AnswerDetail.css";
import CommentList from "../../comments/commentDisplay/CommentsList/CommentsList";
import ImageContainer from "../../images/imageContainer/ImageContainer";
import RatingComponent from "../../ratingComponent/RatingComponent";
import HTMLReactParser from "html-react-parser";

function AnswerDetail({ answer }) {
  console.log("Rendering AnswerDetail with answer:", answer);

  if (!answer) {
    return <div>No answer provided</div>;
  }

  return (
    <div className="answer-detail mx-auto p-4 mb-4">
      <div className="d-flex justify-content-between">
        <div className="answer-body">
          {HTMLReactParser(answer.body) || "No answer body"}
        </div>
        <div className="answer-rating">
          <RatingComponent votes={answer.votes || 0} />
        </div>
      </div>

      {answer.images && answer.images.length > 0 && (
        <div className="mb-4">
          <ImageContainer
            images={answer.images.map(
              (image) => `data:${image.contentType};base64,${image.bytes}`
            )}
          />
        </div>
      )}
      <div className="answer-user-dates">
        <p className="answer-dates">
          <small>Created Date:</small>{" "}
          {new Date(answer.createdDate).toLocaleDateString()}
          <br />
          <small>Updated Date:</small>{" "}
          {new Date(answer.updatedDate).toLocaleDateString()}
        </p>
        <p className="answer-user">
          <small>User :</small> {answer.user?.userName || "Unknown user"}
        </p>
      </div>
      {answer.comments && answer.comments.length > 0 && (
        <CommentList comments={answer.comments} />
      )}
    </div>
  );
}

export default AnswerDetail;
