import React, { useState } from "react";
import { NavLink, Outlet } from "react-router-dom";
import "./PostsPage.css";

const PostsPage = () => {
  return (
    <div className="posts-page-container">
      <div className="tabs-container">
        <NavLink to="" className={({ isActive }) => (isActive ? "tab active" : "tab")}>
          Mening savollarim
        </NavLink>
        <NavLink to="my-answers" className={({ isActive }) => (isActive ? "tab active" : "tab")}>
          Mening javoblarim
        </NavLink>
        <NavLink to="my-comments" className={({ isActive }) => (isActive ? "tab active" : "tab")}>
          Mening fikrlarim
        </NavLink>
      </div>

      <div className="content-container">
        <Outlet /> {/* This is where the content for each tab will be rendered */}
      </div>
    </div>
  );
};

export default PostsPage;
