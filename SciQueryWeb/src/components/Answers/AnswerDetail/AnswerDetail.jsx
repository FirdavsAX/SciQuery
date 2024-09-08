import React from "react";
import "./AnswerDetail.css";
import ImageContainer from "../../images/imageContainer/ImageContainer";
import RatingComponent from "../../ratingComponent/RatingComponent";
import HTMLReactParser from "html-react-parser";
import UserDetail from "../../User/UserMini/UserDetail";
import CommentSection from "../../comments/CommentSection/CommentSection";
import EditButton from "../../EditButton/EditButton";
import DeleteButton from "../../DeleteButton/DeleteButton";
function AnswerDetail({ answer, onEdit,onDelete }) {
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
          <RatingComponent
            initialVotes={answer.votes}
            postId={answer.id}
            postType={0}
          />
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

      <UserDetail
        user={answer.user}
        createdDate={answer.createdDate}
        updatedDate={answer.updatedDate}
      />

      <CommentSection answerId={answer.id} />
      <br /><hr />
      <div className="d-flex justify-content-end align-items-center gap-4">
        <EditButton
          postUserId={answer.user?.id}
          onClick={() => onEdit(answer.id)}
        />
        <DeleteButton
          postUserId={answer.user?.id}
          onClick={() => onDelete(answer.id)}
        />
      </div>
    </div>
  );
}

export default AnswerDetail;
