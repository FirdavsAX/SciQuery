import React, { useEffect, useState } from "react";
import * as signalR from "@microsoft/signalr";
import { API_BASE_URL } from "../../config/Constants";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell } from "@fortawesome/free-solid-svg-icons";
import "./NotificationComponent.css";

const NotificationComponent = () => {
  const [notifications, setNotifications] = useState([]);
  const [connection, setConnection] = useState(null);
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    const connect = new signalR.HubConnectionBuilder()
      .withUrl(API_BASE_URL + "notificationHub", {
        accessTokenFactory: () => window.localStorage.getItem("token"),
      })
      .configureLogging(signalR.LogLevel.Information)
      .withAutomaticReconnect()
      .build();

    connect
      .start()
      .then(() => {
        console.log("Connected to SignalR Hub");
        setConnection(connect);
      })
      .catch((err) => {
        console.error("Error connecting to SignalR Hub:", err);
        // Optional: Retry logic with exponential backoff
        setTimeout(() => connect.start().catch(console.error), 5000);
      });

    return () => {
      connect.stop();
    };
  }, []);

  useEffect(() => {
    if (connection) {
      connection.on("ReceiveNotification", (message) => {
        console.log("Received specific notification:", message);
        setNotifications((prevNotifications) => [
          ...prevNotifications,
          message,
        ]);
      });

      return () => {
        connection.off("ReceiveNotification");
      };
    }
  }, [connection]);

  const handleSend = async () => {
    if (connection) {
      try {
        await connection.invoke("SendNotification", "balrog");
      } catch (err) {
        console.error("Error sending notification:", err);
      }
    }
  };

  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  return (
    <div className="notification-container">
      <div className="notification-bell" onClick={toggleDropdown}>
        <FontAwesomeIcon icon={faBell} />
        {notifications.length > 0 && <span className="badge">{notifications.length}</span>}
      </div>
      {isDropdownOpen && (
        <div className="notification-dropdown">
          <h4>Notifications</h4>
          <ul>
            {notifications.length > 0 ? (
              notifications.map((notification, index) => (
                <li key={index}>{notification}</li>
              ))
            ) : (
              <li>No notifications</li>
            )}
          </ul>
          <button onClick={handleSend}>Send Test Notification</button>
        </div>
      )}
    </div>
  );
};

export default NotificationComponent;
