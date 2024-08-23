import React from "react";
import HtmlParser from "html-react-parser";
import { useFetch } from "../../hooks/useFetch";
import { useParams } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Spinner from "../../Spinner/Spinner";
import "./QuestionDetail.css";
import ImageContainer from "../../images/imageContainer/ImageContainer";
import RatingComponent from "../../ratingComponent/RatingComponent";
import CommentList from "../../comments/commentDisplay/CommentsList/CommentsList";
import UserDetail from "../../User/UserMini/UserDetail";

function QuestionDetail() {
  const { id } = useParams();
  const url = `questions/${id}`;
  const { data: fullQuestion, isPending } = useFetch(url);
  const images =
    fullQuestion &&
    fullQuestion.images &&
    fullQuestion.images.map(
      (image) => `data:${image.contentType};base64,${image.bytes}`
    );

  return (
    <div className="question-container mt-4">
      {isPending && <Spinner />}

      {fullQuestion && (
        <div className="question-detail mx-auto p-4 mb-4">
          <div className="d-flex justify-content-between m-5 ml-5 gap-5">
            <div>
              <h2 className="mb-4">
                {fullQuestion.title || "No title available"}
              </h2>
              <div className="question-body">
                {HtmlParser(fullQuestion.body) || "No body available"}
              </div>
            </div>
            <div className="rating-container">
              {fullQuestion && (
                <RatingComponent
                  initialVotes={fullQuestion.votes ? fullQuestion.votes : 0}
                  postId={fullQuestion.id}
                  postType={1}
                />
              )}
            </div>
          </div>

          <div className="mb-4">
            {images && images.length > 0 ? (
              <ImageContainer images={images} />
            ) : (
              <p>No images available</p>
            )}
          </div>
          <div className="mb-4">
            <UserDetail
              user={fullQuestion.user}
              createdDate={fullQuestion.createdDate}
              updatedDate={fullQuestion.updatedDate}
            />
          </div>
          {fullQuestion.comments && fullQuestion.comments.length > 0 && (
            <CommentList comments={fullQuestion.comments} />
          )}
        </div>
      )}
    </div>
  );
}

export default QuestionDetail;
