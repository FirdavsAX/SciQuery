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

    setConnection(connect);
  }, []);

  useEffect(() => {
    if (connection) {
      connection
        .start()
        .then(() => {
          connection.on("ReceiveOldNotifications", (oldNotifications) => {
            setNotifications((prevNotifications) => {
              const combinedNotifications = [
                ...prevNotifications,
                ...oldNotifications.filter(
                  (newNotification) =>
                    !prevNotifications.some(
                      (notification) => notification.id === newNotification.id
                    )
                ),
              ];
              return combinedNotifications;
            });
          });

          connection.on("ReceiveNotification", (message) => {
            setNotifications((prevNotifications) => {
              const exists = prevNotifications.some(
                (notification) => notification.id === message.id
              );
              if (!exists) {
                return [...prevNotifications, { ...message, read: false }];
              }
              return prevNotifications;
            });
          });
        })
        .catch((e) => console.log("Connection failed!", e));
    }
  }, [connection]);

  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
    // Mark notifications as read when dropdown is opened
    if (isDropdownOpen) {
      setNotifications((prevNotifications) =>
        prevNotifications.map((notification) => ({
          ...notification,
          read: true,
        }))
      );
    }
  };

  return (
    <div className="notification-container">
      <div className="notification-bell" onClick={toggleDropdown}>
        <FontAwesomeIcon icon={faBell} />
        {notifications.some((n) => !n.read) && (
          <span className="badge">
            {notifications.filter((n) => !n.read).length}
          </span>
        )}
      </div>
      {isDropdownOpen && (
        <div className="notification-dropdown">
          <h4>Notifications</h4>
          <ul>
            {notifications.length > 0 ? (
              notifications.map((notification, index) => (
                <li
                  key={index}
                  className={notification.read ? "read" : "unread"}
                >
                  {notification.message}
                </li>
              ))
            ) : (
              <li>No notifications</li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
};

export default NotificationComponent;
