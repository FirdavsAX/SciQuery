import { NavLink } from "react-router-dom";
import "./QuestionItem.css";
import { useState } from "react";

const QuestionItem = (questionObject) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const timeAgo = (date) => {
    // (Time ago calculation logic stays the same)
  };

  const question = questionObject.question;
  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <>
      {question && (
        <div className="question-container-item m-3 pt-6">
          <NavLink to={`/questions/${question.id}`}>
            <h6>{question.title || "No title available"}</h6>
          </NavLink>
          <div className="question-content">
            {isExpanded ? (
              <p>{question.body}</p>
            ) : (
              <p className="question-content">
                {question.body}
              </p>
            )}
            {question.body.length > 100 && !isExpanded && (
              <span onClick={toggleExpanded} className="read-more">
                ...read more
              </span>
            )}
            {isExpanded && (
              <span onClick={toggleExpanded} className="read-more">
                show less
              </span>
            )}
          </div>
          <div className="d-flex justify-content-between align-items-center">
            <div className="d-flex justify-content-start mx-4">
              {question.tags && question.tags.length > 0 ? (
                question.tags.map((tag, index) => (
                  <div
                    key={new Date().getMilliseconds() + index}
                    className="tags"
                  >
                    {tag.name}
                  </div>
                ))
              ) : (
                <p></p>
              )}
            </div>
            <div className="d-flex justify-content-end align-items-center">
              <p>
                <NavLink to={`/profile/${question.user.id}`}>
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
