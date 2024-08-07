import React from "react";
import { useFetch } from "../../hooks/useFetch";
import { NavLink } from "react-router-dom";
import QuestionItem from "../QuestionItem/QuestionItem";

function QuestionsList() {
  const {
    data: questions,
    isPending,
    error,
  } = useFetch("https://localhost:7008/api/Questions");

  return (
    <div>
      {isPending && <h3>Loading</h3>}
      {error && <h3>{error}</h3>}
      {questions &&
        questions.data &&
        questions.data.map((question) => {
          return (
            <div key={question.id}>
                <QuestionItem question={question}/>
              <NavLink to={`/questions/${question.id}`}>Read More</NavLink>
            </div>
          );
        })}
    </div>
  );
}

export default QuestionsList;
