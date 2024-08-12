import { NavLink } from "react-router-dom";
import "./QuestionItem.css";
const QuestionItem = (questionObject) => {
  const timeAgo = (date) => {
    const now = new Date();
    const seconds = Math.floor((now - new Date(date)) / 1000);
    let interval = Math.floor(seconds / 31536000);

    if (interval >= 1) {
      return `${interval} year${interval > 1 ? "s" : ""} ago`;
    }
    interval = Math.floor(seconds / 2592000);
    if (interval >= 1) {
      return `${interval} month${interval > 1 ? "s" : ""} ago`;
    }
    interval = Math.floor(seconds / 86400);
    if (interval >= 1) {
      return `${interval} day${interval > 1 ? "s" : ""} ago`;
    }
    interval = Math.floor(seconds / 3600);
    if (interval >= 1) {
      return `${interval} hour${interval > 1 ? "s" : ""} ago`;
    }
    interval = Math.floor(seconds / 60);
    if (interval >= 1) {
      return `${interval} minute${interval > 1 ? "s" : ""} ago`;
    }
    return "just now";
  };

  const question = questionObject.question;
  return (
    <>
      {question && (
        <div className="question-container m-3 pt-6">
          <NavLink to={`/questions/${question.id}`}>
            <h6>{question.title || "No title available"}</h6>
          </NavLink>
          <div className="d-flex justify-content-between align-items-center">
            <div className="d-flex justify-content-start mx-4">
              {question.tags && question.tags.length > 0 ? (
                question.tags.map((tag, index) => {
                  {
                    return (
                      <div
                        key={new Date().getMilliseconds() + index}
                        className="tags"
                      >
                        {tag.name}
                      </div>
                    );
                  }
                })
              ) : (
                <p></p>
              )}
            </div>
            <div className="d-flex justify-content-end align-items-center">
              <p>
                <NavLink to={`/profile/{question.user.id}`}>
                  {question.user.userName}
                </NavLink>
                {question.createdDate < question.updatedDate ? (
                  <> modified : {timeAgo(question.updatedDate)}</>
                ) : (
                  <> created : {timeAgo(question.createdDate)}</>
                )}
              </p>
            </div>
          </div>
            <div className="stats">
              <p className="mb-2">
                <small className="text-muted">
                  {question.answersCount} answered
                </small>
              </p>
              <p className="mb-2">
                <small className="text-muted">
                  {question.commentsCount} commented
                </small>
              </p>
              <p className="mb-2">
                <small className="text-muted">{question.votes} votes</small>
              </p>
            </div>
        </div>
      )}
    </>
  );
};

export default QuestionItem;
