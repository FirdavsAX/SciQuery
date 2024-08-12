import React from "react";
import { useFetch } from "../../hooks/useFetch";
import { NavLink } from "react-router-dom";
import QuestionItem from "../QuestionItem/QuestionItem";
import Spinner from "../../Spinner/Spinner";
import { HubConnectionBuilder } from '@microsoft/signalr';

function QuestionsList() {
  const {
    data: questions,
    isPending,
    error,
  } = useFetch("https://xmzj98xt-7008.euw.devtunnels.ms/api/Questions");

  const connection = new HubConnectionBuilder()
      .withUrl('https://xmzj98xt-7008.euw.devtunnels.ms/api/notificationHub')
      .build();
  
  connection.on('ReceiveNotification', (message) => {
      // Bildirishnomani ko'rsatish
      console.log('New Notification:', message);
  });
  
  connection.start()
  .then(() => console.log('Connected to SignalR hub'))
  .catch(err => console.error('Error connecting to hub:', err));

connection.on('ReceiveMessage', message => {
  console.log('Received message:', message);
  
});
  return (
    <div>

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
