import React, { useState, useRef, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell } from "@fortawesome/free-solid-svg-icons";
import "./NotificationComponent.css";
import { NavLink } from "react-router-dom";
import { useUpdate } from "../hooks/useUpdate";
import { useNotifications } from "../hooks/useNotification";

const NotificationComponent = () => {
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const { markAsRead, getUnreadNotifications } = useNotifications();
  const { update } = useUpdate();
  const notifications = getUnreadNotifications();
  const timeoutRef = useRef(null);

  const handleMouseEnter = () => {
    clearTimeout(timeoutRef.current); // Clear any pending close timeout
    setDropdownOpen(true); // Open the dropdown on hover
  };

  const handleMouseLeave = () => {
    // Close the dropdown after 2 seconds of unhovering
    timeoutRef.current = setTimeout(() => {
      setDropdownOpen(false);
    }, 1600);
  };

  const toggleDropdown = (e) => {
    e.stopPropagation();
    setDropdownOpen((prev) => !prev);
  };

  const handleNotificationClick = async (notification) => {
    await markAsRead(notification, update);
  };

  useEffect(() => {
    return () => {
      clearTimeout(timeoutRef.current); // Clean up the timeout on component unmount
    };
  }, []);

  return (
    <div
      className="notification-container"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="notification-bell" onClick={toggleDropdown}>
        <FontAwesomeIcon icon={faBell} />
        {notifications.length > 0 && (
          <span className="badge">
            {notifications.length}
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
                  className={notification.isRead ? "read" : "unread"}
                >
                  <NavLink
                    to={`/questions/${notification.questionId}`}
                    onClick={() => handleNotificationClick(notification)}
                  >
                    {notification.message}
                  </NavLink>
                </li>
              ))
            ) : (
              <li>No notifications</li>
            )}
          </ul>
          <button onClick={toggleDropdown}>Close</button>
        </div>
      )}
    </div>
  );
};

export default NotificationComponent;
