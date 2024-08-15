import React, { useEffect, useState } from "react";
import * as signalR from "@microsoft/signalr";
import { API_BASE_URL } from "../../config/Constants";

const NotificationComponent = () => {
  const [notifications, setNotifications] = useState([]);
  const [connection, setConnection] = useState(null);

  useEffect(() => {
    const connect = new signalR.HubConnectionBuilder()
      .withUrl(API_BASE_URL + "notificationHub", {
        accessTokenFactory: () => window.localStorage.getItem("token"), // Ensure the user is authenticated
      })
      .withAutomaticReconnect()
      .build();

    setConnection(connect);

    connect
      .start()
      .then(() => {
        console.log("Connected to SignalR Hub");
      })
      .catch((err) => console.error("Error connecting to SignalR Hub:", err));

    return () => {
      connect.stop();
    };
  }, []);
  useEffect(() => {
    if (connection) {
        connection.on("ReceiveNotification", (message) => {
            console.log("Received specific notification:", message);
            // Handle the notification, e.g., update state
        });

        return () => {
            connection.off("ReceiveNotification");
        };
    }
}, [connection]);

  return (
    <div>
      <h2>Notifications</h2>
      <ul>
        {notifications.map((notification, index) => (
          <li key={index}>{notification}</li>
        ))}
      </ul>
    </div>
  );
};

export default NotificationComponent;
