// Sidebar.js
import React from 'react';
import './Sidebar.scss';

const Sidebar = () => {
  return (
    <ul className="menu-hover-fill flex flex-col items-start leading-none text-2xl uppercase space-y-4">
      <li><a href="#" data-text="Home">Home</a></li>
      <li><a href="#" data-text="Archives">Archives</a></li>
      <li><a href="#" data-text="Tags">Tags</a></li>
      <li><a href="#" data-text="Categories">Categories</a></li>
      <li><a href="#" data-text="About">About</a></li>
    </ul>
  );
};

export default Sidebar;
