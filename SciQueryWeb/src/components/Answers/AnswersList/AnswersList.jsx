import { useParams } from "react-router-dom";
import { useFetch } from "../../hooks/useFetch";
import AnswerDetail from "../AnswerDetail/AnswerDetail";
import { useEffect, useState } from "react";
import Pagination from "../../Pagination/Pagination";
import { useDelete } from "../../hooks/useDelete";
// Lazy yuklanadigan komponent
function AnswersList({ setAnswerToIdEdit, setHasAnswered, userId }) {
  const { id } = useParams();
  const answersUrl = `answers?questionId=${id}`;
  const [pageNumber, setPageNumber] = useState(1);
  const { data: paginatedAnswers } = useFetch(answersUrl);
  const answers = paginatedAnswers && paginatedAnswers.data;
  const {deleteItem} = useDelete();
  useEffect(() => {
    if (answers && answers.length > 0) {
      const userHasAnswered = answers.some(answer => answer.userId === userId);
      setHasAnswered(userHasAnswered); // Set the hasAnswered state in the parent component
    }
  }, [answers, userId, setHasAnswered]);

  const onPageChange = (pageNumber) => {
    setPageNumber(pageNumber);
  };
  const onDelete = async (id) => {
    await deleteItem(`answers/${id}`);
    answers = answers.filter(number => number.id !== id);
  };

  return (
    <div className="answers-list-container mt-4">
      {answers && answers.length > 0 ? (
        <div>
          {answers.map((answer) => (
            <div key={answer.id}>
              <AnswerDetail 
                answer={answer}
                onDelete={onDelete}
                onEdit={setAnswerToIdEdit} 
              />
            </div>
          ))}
          <Pagination
            currentPage={paginatedAnswers.currentPage}
            totalPages={paginatedAnswers.pagesCount}
            onPageChange={onPageChange}
          />
        </div>
      ) : (
        <p>No answers available</p>
      )}
    </div>
  );
}

export default AnswersList;
