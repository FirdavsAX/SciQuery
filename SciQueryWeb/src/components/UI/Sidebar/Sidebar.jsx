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
          <NavLink to="/" data-text="Asosiy">Asosiy</NavLink>

          </li>
          <li>
            <NavLink to="/questions" data-text="Savollar">Savollar</NavLink>
          </li>
          <li>
            <NavLink to="/profile/" data-text="Shaxsiy">Shaxsiy</NavLink>
          </li>
          <li>
            <NavLink to="/Posts/" data-text="Postlarim">Postlarim</NavLink>
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
