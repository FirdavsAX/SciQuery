// Sidebar.js
import React from "react";
import "./Sidebar.scss";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
  return (
    <>
      <div className="sidebar">
        <ul className="menu-hover-fill flex flex-col items-start leading-none text-2xl uppercase space-y-4">
          <li>
          <NavLink to="/" data-text="Home">Home</NavLink>

          </li>
          <li>
            <NavLink to="/questions" data-text="Questions">Questions</NavLink>
          </li>
          <li>
            <NavLink to="/profile/" data-text="Profile">Profile</NavLink>
          </li>
          <li>
            <a href="#" data-text="Tags">
              Tags
            </a>
          </li>
          <li>
            <a href="#" data-text="Categories">
              Categories
            </a>
          </li>
        </ul>
      </div>
    </>
  );
};

export default Sidebar;
