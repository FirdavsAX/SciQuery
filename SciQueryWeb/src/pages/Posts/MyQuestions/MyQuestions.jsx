import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useFetch } from "../../../components/hooks/useFetch";
import QuestionItem from "../../../components/Questions/QuestionItem/QuestionItem";
import Spinner from "../../../components/Spinner/Spinner";
import Pagination from "../../../components/Pagination/Pagination";
import { useUserIdFromToken } from "../../../components/hooks/useUserIdFromToken";

function MyQuestions() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [currentPage, setCurrentPage] = useState(Number(searchParams.get("pageNumber")) || 1);


  const {userId} = useUserIdFromToken(window.localStorage.getItem('token'));
  const { data: questions, isPending } = useFetch(`questions/?userId=${userId}&pageNumber=${currentPage}`);

  useEffect(() => {
    setSearchParams({ pageNumber: currentPage });
  }, [currentPage, setSearchParams]);

  const onPageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div>
      {isPending && <Spinner showImg={true} />}
      {questions && questions.data && (
        <>
          {questions.data.map((question) => (
            <div key={question.id}>
              <QuestionItem question={question} />
            </div>
          ))}

          <Pagination
            currentPage={currentPage}
            totalPages={questions.pagesCount}
            onPageChange={onPageChange}
          />
        </>
      )}
    </div>
  );
}

export default MyQuestions;
