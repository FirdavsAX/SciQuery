import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useFetch } from "../../../components/hooks/useFetch";
import QuestionItem from "../../../components/Questions/QuestionItem/QuestionItem";
import Spinner from "../../../components/Spinner/Spinner";
import Pagination from "../../../components/Pagination/Pagination";
import { useUserIdFromToken } from "../../../components/hooks/useUserIdFromToken";
import AnswerDetail from "../../../components/Answers/AnswerDetail/AnswerDetail";

function MyQuestions() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [currentPage, setCurrentPage] = useState(
    Number(searchParams.get("pageNumber")) || 1
  );
  
  const { userId } = useUserIdFromToken(window.localStorage.getItem("token"));

  const { data: paginatedList, isPending } = useFetch(
    `answers/?UserId=${userId}&pageNumber=${currentPage}`,
    [userId, currentPage] // Ensures fetch is only triggered when userId or currentPage changes
  );

  useEffect(() => {
    setSearchParams({ pageNumber: currentPage });
  }, [currentPage, setSearchParams]);

  const onPageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div>
      {isPending && <Spinner showImg={true} />}
      {paginatedList && paginatedList.data && (
        <>
          {paginatedList.data.map((answer) => (
            <div key={answer.id}>
              <AnswerDetail answer={answer} />
            </div>
          ))}

          <Pagination
            currentPage={currentPage}
            totalPages={paginatedList.pagesCount}
            onPageChange={onPageChange}
          />
        </>
      )}
    </div>
  );
}

export default MyQuestions;
