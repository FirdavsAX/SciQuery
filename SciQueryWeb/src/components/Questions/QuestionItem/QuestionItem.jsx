import { NavLink } from "react-router-dom";
import "./QuestionItem.css";
import { useState } from "react";
import UserDetail from "../../User/UserMini/UserDetail";

const QuestionItem = ({ question, handleTagSelection }) => {
  const [isExpanded, setIsExpanded] = useState(false);

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
              <p className="question-content">{question.body.slice(0, 100) + '...'}</p>
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
                    onClick={() => handleTagSelection(tag.name)}
                    key={index}
                    className="tags"
                  >
                    {tag.name}
                  </div>
                ))
              ) : (
                <p>No tags available</p>
              )}
            </div>
            <div className="d-flex justify-content-end align-items-center">
              <UserDetail
                user={question.user}
                createdDate={question.createdDate}
                updatedDate={question.updatedDate}
              />
            </div>
          </div>
          <div className="stats">
            <p className="mb-2">
              <small className="text-muted">
                {question.answersCount} ta javob berildi
              </small>
            </p>
            <p className="mb-2">
              <small className="text-muted">
                {question.commentsCount} ta fikr yozildi
              </small>
            </p>
            <p className="mb-2">
              <small className="text-muted">
                {question.votes} ta ovoz berildi
              </small>
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default QuestionItem;
