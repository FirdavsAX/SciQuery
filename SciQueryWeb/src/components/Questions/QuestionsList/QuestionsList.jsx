import React, { useEffect } from "react";
import { useFetch } from "../../hooks/useFetch";
import { NavLink } from "react-router-dom";
import QuestionItem from "../QuestionItem/QuestionItem";
import Spinner from "../../Spinner/Spinner";
import { HubConnectionBuilder, LogLevel } from "@microsoft/signalr";
import { API_BASE_URL } from "../../../config/Constants";
import NotificationComponent from "../../Notification/NotificationComponent";

function QuestionsList() {
  const {
    data: questions,
    isPending,
    error,
  } = useFetch(API_BASE_URL + "questions");

  return (
    <div>
<NotificationComponent/>
      {isPending && <Spinner showImg={isPending} />}
      {error && <h3>{error}</h3>}
      {questions &&
        questions.data &&
        questions.data.map((question) => {
          return (
            <div key={question.id}>
              <QuestionItem question={question} />
            </div>
          );
        })}
    </div>
  );
}

export default QuestionsList;
