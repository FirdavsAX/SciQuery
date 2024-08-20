import { useState } from "react";
import { useFetch } from "../../hooks/useFetch";
import QuestionItem from "../QuestionItem/QuestionItem";
import Spinner from "../../Spinner/Spinner";
import NotificationComponent from "../../Notification/NotificationComponent";
import Pagination from "../../Pagination/Pagination";

function QuestionsList() {
  const [currentPage, setCurrentPage] = useState(1);
  const { data: questions, isPending, error } = useFetch(`questions?pageNumber=${currentPage}`);
  
  const onPageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div>
      <NotificationComponent />
      {isPending && <Spinner showImg={isPending} />}
      {error && <h3>{error}</h3>}
      {questions && questions.data && (
        <>
          {questions.data.map((question) => (
            <div key={question.id}>
              <QuestionItem question={question} />
            </div>
          ))}
          <Pagination
            currentPage={questions.currentPage}
            totalPages={questions.pagesCount}
            onPageChange={onPageChange}
          />
        </>
      )}
    </div>
  );
}

export default QuestionsList;
