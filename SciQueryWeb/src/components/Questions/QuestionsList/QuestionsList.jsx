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

  // useEffect(() => {
  //   const connection = new HubConnectionBuilder()
  //     .withUrl(API_BASE_URL + 'notificationHub', {
  //       accessTokenFactory: () => window.localStorage.getItem("token"),
  //     })
  //     .withAutomaticReconnect()
  //     .configureLogging(LogLevel.Information) // Enable detailed logging
  //     .build();
  
      
  //     connection
  //     .start()
  //     .then(() => console.log("Connected to SignalR hub"))
  //     .catch((err) => console.error("Error connecting to hub:", err));
  //     connection.on("SendNotification", (message) => {
  //       console.log("New Notification:", message);
  //     });

  //   return () => {
  //     connection
  //       .stop()
  //       .catch((err) => console.error("Error stopping connection:", err));
  //   };
  // }, []); // Empty dependency array ensures this runs once on mount
 
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
