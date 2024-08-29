import React, { useState, useEffect } from "react";
import { useSearchParams, useOutletContext } from "react-router-dom";
import { useFetch } from "../../hooks/useFetch";
import QuestionItem from "../QuestionItem/QuestionItem";
import Spinner from "../../Spinner/Spinner";
import Pagination from "../../Pagination/Pagination";
import FilterBar from "../../../Filterbar/FilterBar";
import './QuestionsList.css'


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

  const handleTagSelection = (tag) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      tags: tag
    }));
    setCurrentPage(1); // Reset to the first page when tag is changed
  };

  const handleTagRemove = () => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      tags: ''
    }));
  };

  return (
    <div>
      <br />
      <FilterBar onApplyFilter={handleApplyFilter} onTagSelect={handleTagSelection} />
      {filters.tags && (
        <div className="selected-tags">
          <span className="tag">
            {filters.tags}
            <button className="remove-tag-button" onClick={handleTagRemove}>X</button>
          </span>
        </div>
      )}
      {isPending && <Spinner showImg={true} />}
     
      {questions && questions.data && (
        <>
          {questions.data.map((question) => (
            <div key={question.id}>
              <QuestionItem question={question} handleTagSelection={handleTagSelection} />
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
