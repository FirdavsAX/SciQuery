import "./QuestionItem.css";
const QuestionItem = (questionObject ) => {
  const question = questionObject.question;
  return (
    <>
      {question && <div className="question-container">
        <h2>{question.title || "No title available"}</h2>
        <p>Created Date: {new Date(question.createdDate).toLocaleDateString()}</p>
        <p>Updated Date: {new Date(question.updatedDate).toLocaleDateString()}</p>
        <h2>Comments</h2>
        <ul>
          {question.comments && question.comments.length > 0 ? (
            question.comments.map((comment) => (
              <li key={comment.id}>
                <p>{comment.body || "No comment body"}</p>
                <p>User ID: {comment.userId || "Unknown user"}</p>
              </li>
            ))
          ) : (
            <li>No comments available</li>
          )}
        </ul>
      </div>}
    </>
  );
};

export default QuestionItem;
