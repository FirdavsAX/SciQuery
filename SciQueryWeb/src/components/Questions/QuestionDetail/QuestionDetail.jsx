import "./QuestionDetail.css";
import HtmlParser from "html-react-parser";
import Spinner from "../../Spinner/Spinner";
import React, { Suspense, lazy } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useFetch } from "../../hooks/useFetch";
import EditButton from "../../EditButton/EditButton";
import { useParams, useNavigate } from "react-router-dom";
import CommentSection from "../../comments/CommentSection/CommentSection";

// Lazy load components
const ImageContainer = lazy(() =>
  import("../../images/imageContainer/ImageContainer")
);
const RatingComponent = lazy(() =>
  import("../../ratingComponent/RatingComponent")
);
const UserDetail = lazy(() => import("../../User/UserMini/UserDetail"));

function QuestionDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const url = `questions/${id}`;
  const {
    data: fullQuestion,
    isPending: questionPending,
    error: questionError,
  } = useFetch(url);

  const images = fullQuestion?.images?.map(
    (image) => `data:${image.contentType};base64,${image.bytes}`
  );

  const handleUpdateClick = () => {
    navigate(`/questions/edit/${id}/`);
  };

  return (
    <div className="question-container mt-4">
      {questionPending && <Spinner />}
      {questionError && <p>Error fetching question details</p>}
      {!questionPending && fullQuestion && (
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
            <Suspense fallback={<Spinner />}>
              <div className="rating-container">
                <RatingComponent
                  initialVotes={fullQuestion.votes || 0}
                  postId={fullQuestion.id}
                  postType={1}
                />
              </div>
            </Suspense>
          </div>

          <div className="mb-4">
            {images && images.length > 0 ? (
              <Suspense fallback={<Spinner />}>
                <ImageContainer images={images} />
              </Suspense>
            ) : (
              <p className="no-images-text">Rasm mavjud emas</p>
            )}
          </div>
          <div className="mb-4">
            <Suspense fallback={<Spinner />}>
              <UserDetail
                user={fullQuestion.user}
                createdDate={fullQuestion.createdDate}
                updatedDate={fullQuestion.updatedDate}
              />
            </Suspense>
          </div>
          <div className="mb-4">
            <Suspense fallback={<Spinner />}>
              <CommentSection questionId={fullQuestion.id} />
            </Suspense>
          </div>

          {fullQuestion && (
            <EditButton
              postUserId={fullQuestion.user?.id}
              onClick={handleUpdateClick}
            />
          )}
        </div>
      )}
    </div>
  );
}

export default QuestionDetail;
