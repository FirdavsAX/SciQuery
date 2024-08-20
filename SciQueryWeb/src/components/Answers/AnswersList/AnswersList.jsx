import { useParams } from "react-router-dom";
import { useFetch } from "../../hooks/useFetch";
import AnswerDetail from "../AnswerDetail/AnswerDetail";
import { useState } from "react";
import Pagination from "../../Pagination/Pagination";
// Lazy yuklanadigan komponent

function AnswersList() {
  const { id } = useParams();
  const answersUrl = `answers/question/${id}`;
  const [pageNumber,setPageNumber] = useState(1);
  // Ma'lumotlarni olish
  const { data: paginatedAnswers } = useFetch(answersUrl);
  const answers = paginatedAnswers && paginatedAnswers.data;
  const onPageChange = (pageNumber) =>{
    setPageNumber(pageNumber);
  }

  return (
    <div className="answers-list-container mt-4">
      {answers && answers.length > 0 ? (
        <div>
          {answers.map((answer) => (
            <div key={answer.id}>
              <AnswerDetail answer={answer} />
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
