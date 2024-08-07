import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from '../components/UI/Navbar/Navbar'
import Sidebar from "../components/UI/Sidebar/Sidebar";
function RootLayout() {
  return (
    <>
      <Sidebar />
      <Navbar />
      <main>
        <Outlet />
      </main>
      <footer></footer>
    </>
  );
}

export default RootLayout;
