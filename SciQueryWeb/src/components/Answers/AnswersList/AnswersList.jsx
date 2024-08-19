import { useParams } from "react-router-dom";
import { useFetch } from "../../hooks/useFetch";
import AnswerDetail from '../AnswerDetail/AnswerDetail'
// Lazy yuklanadigan komponent

function AnswersList() {
  const { id } = useParams();
  const answersUrl = `answers/question/${id}`;

  // Ma'lumotlarni olish
  const { data: paginatedAnswers } = useFetch(answersUrl);
  const answers = paginatedAnswers && paginatedAnswers.data;

  return (
    <div className="answers-list-container mt-4">
      {answers && answers.length > 0 ? (
          <div>
            {answers.map((answer) => (
              <div key={answer.id}>
                <AnswerDetail answer={answer} />
              </div>
            ))}
          </div>
      ) : (
        <p>No answers available</p>
      )}
    </div>
  );
}

export default AnswersList;
