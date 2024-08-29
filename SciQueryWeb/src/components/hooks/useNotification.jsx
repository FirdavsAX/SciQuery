import { useEffect, useState } from "react";
import * as signalR from "@microsoft/signalr";
import { API_BASE_URL } from "../../config/Constants";
import { useFetch } from '../hooks/useFetch'
export const useNotifications = () => {
  const [notifications, setNotifications] = useState(() => {
    const savedNotifications = localStorage.getItem("notifications");
    return (savedNotifications && savedNotifications !== 'undefined') ? JSON.parse(savedNotifications) : [];
  });
  const [connection, setConnection] = useState(null);
  useEffect(() => {
    const connect = new signalR.HubConnectionBuilder()
      .withUrl(API_BASE_URL + "notificationHub", {
        accessTokenFactory: () => window.localStorage.getItem("token"),
      })
      .configureLogging(signalR.LogLevel.Information)
      .withAutomaticReconnect()
      .build();

    connect.onclose(() => {
      console.warn("Connection closed, will attempt to reconnect.");
    });

    setConnection(connect);
  }, []);

  useEffect(() => {
    if (connection) {
      connection
        .start()
        .then(() => {
          connection.on("ReceiveNotification", (message) => {
            updateNotifications((prevNotifications) => {
              if (!prevNotifications.some((n) => n.id === message.id)) {
                return [...prevNotifications, { ...message }];
              }
              return prevNotifications;
            });
          });
        })
        .catch((e) => console.log("Connection failed!", e));
    }
  }, [connection]);

  const updateNotifications = (newNotifications) => {
    setNotifications(newNotifications);
    localStorage.setItem("notifications", JSON.stringify(newNotifications));
  };

  const markAsRead = async (notification) => {
    const id = notification.id;

    try {
      await connection.invoke("MarkAsRead", id);
      updateNotifications(
        notifications.map((n) =>
          n.id === notification.id ? { ...n, isRead: true } : n
        )
      );
    } catch (error) {
      console.error("Failed to mark notification as read", error);
    }
  };

  const getUnreadNotifications = () => {
    return notifications.filter((notification) => !notification.isRead);
  };
  return { notifications, markAsRead, getUnreadNotifications };
};
