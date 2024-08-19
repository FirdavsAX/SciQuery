import { Link } from "react-router-dom";
import { useFetch } from "../../hooks/useFetch";
import "./RelatedQuestions.css";

function RelatedQuestions({ id }) {
  const relatedQuestionsUrl = `questions/get-by-tags/${id}`;
  const { data: relatedQuestionsPaginatedList, isPending } =
    useFetch(relatedQuestionsUrl);
  const relatedQuestions =
    relatedQuestionsPaginatedList && relatedQuestionsPaginatedList.data;

  return (
    <div className="related-questions-container">
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
    </div>
  );
}

export default RelatedQuestions;
