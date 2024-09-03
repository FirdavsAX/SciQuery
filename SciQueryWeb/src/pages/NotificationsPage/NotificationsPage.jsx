import React, { useState, useEffect } from "react";
import { useFetch } from "../../components/hooks/useFetch";
import { NavLink } from "react-router-dom";
import "./NotificationsPage.css";
import UserDetail from "../../components/User/UserMini/UserDetail";
import Pagination from "../../components/Pagination/Pagination";

const NotificationsPage = () => {
  const [filter, setFilter] = useState("all"); // State for managing filter
  const [pageNumber, setPageNumber] = useState(1);
  const [apiEndpoint, setApiEndpoint] = useState("notification");

  // Update the API endpoint based on the filter
  useEffect(() => {
    if (filter === "unread") {
      setApiEndpoint("notification?SortBy=Unread");
    } else {
      setApiEndpoint("notification");
    }
  }, [filter]);

  // Fetch notifications from the API
  const { data: paginatedList } = useFetch(apiEndpoint);
  const notifications = paginatedList?.data || [];

  const handleFilterChange = (newFilter) => {
    setFilter(newFilter);
    setPageNumber(1); // Reset page number on filter change
  };

  const onPageChange = (pageNumber) => {
    setPageNumber(pageNumber);
  };

  const markAsRead = (notification) => {
    // Implementation of markAsRead should be added here
    console.log("Mark as read:", notification);
  };

  return (
    <div className="notifications-page">
      <h2>Notifications</h2>
    <hr />
    <br />
      <div className="filter-controls">
        <button onClick={() => handleFilterChange("all")}>All</button>
        <button onClick={() => handleFilterChange("unread")}>Unread</button>
      </div>

      <section className="notifications-list">
        {notifications.length > 0 ? (
          <ul>
            {notifications.map((notification) => (
              <li
                key={notification.id}
                className={`notification-item ${
                  notification.isRead ? "read" : "unread"
                }`}
              >
                <div className="notification-content">
                  <NavLink
                    to={`/questions/${notification.questionId}`}
                    onClick={() =>
                      !notification.isRead && markAsRead(notification)
                    }
                  >
                    <div className="notification-message">
                      {notification.message}
                    </div>
                    <span className="notification-time">
                      {new Date(notification.timeSpan).toLocaleString()}
                    </span>
                  </NavLink>
                  {notification.user && (
                    <UserDetail
                      user={notification.user}
                      createdDate={notification.timeSpan}
                    />
                  )}
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p>No notifications to display.</p>
        )}
      </section>

      {paginatedList && (
        <Pagination
          currentPage={paginatedList.currentPage}
          totalPages={paginatedList.pagesCount}
          onPageChange={onPageChange}
        />
      )}
    </div>
  );
};

export default NotificationsPage;
