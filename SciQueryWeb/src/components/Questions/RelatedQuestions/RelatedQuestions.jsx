import { Link } from "react-router-dom";
import { useFetch } from "../../hooks/useFetch";
import "./RelatedQuestions.css";

function RelatedQuestions({ id }) {
  const relatedQuestionsUrl = `questions/get-by-tags/${id}`;
  const { data: relatedQuestionsPaginatedList, isPending } = useFetch(relatedQuestionsUrl);
  const relatedQuestions = relatedQuestionsPaginatedList && relatedQuestionsPaginatedList.data;

  return (
    <div className="related-questions-container">
      <h2>O'xshash savollar</h2>
      <br />
      <hr />
      {relatedQuestions && relatedQuestions.length > 0 ? (
        <div>
          {relatedQuestions.map((question) => (
            <div key={question.id} className="related-question">
              <Link to={`/questions/${question.id}`}>
                {question.title}
              </Link>
            </div>
          ))}
        </div>
      ) : (
        !isPending && <p>No related questions found.</p>
      )}
      <br />
      <hr />
    </div>
  );
}

export default RelatedQuestions;
