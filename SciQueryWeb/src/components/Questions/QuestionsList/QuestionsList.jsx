import React, { useState, useEffect } from "react";
import { useSearchParams, useNavigate, useOutletContext } from "react-router-dom";
import { useFetch } from "../../hooks/useFetch";
import QuestionItem from "../QuestionItem/QuestionItem";
import Spinner from "../../Spinner/Spinner";
import Pagination from "../../Pagination/Pagination";
import FilterBar from "../../../Filterbar/FilterBar";

function QuestionsList() {
  const [search, setSearch] = useOutletContext();
  const [searchParams, setSearchParams] = useSearchParams();
  const [currentPage, setCurrentPage] = useState(Number(searchParams.get("pageNumber")) || 1);
  const [filters, setFilters] = useState({
    sortBy: '',
    noAnswers: false,
    noAcceptedAnswer: false,
    hasBounty: false,
    tags: ''
  });

  const searchQuery = search || "";
  const filterParams = {
    ...filters,
    search: encodeURIComponent(searchQuery),
    pageNumber: currentPage
  };

  const { data: questions, isPending } = useFetch(`questions?${new URLSearchParams(filterParams).toString()}`);
  
  useEffect(() => {
    setSearchParams(filterParams);
  }, [currentPage, search, filters, setSearchParams]);

  const onPageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleApplyFilter = (appliedFilters) => {
    setFilters(appliedFilters);
    setCurrentPage(1); // Reset to the first page when filters are applied
  };

  return (
    <div>
      <br />
      <FilterBar onApplyFilter={handleApplyFilter} />
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

export default QuestionsList;
