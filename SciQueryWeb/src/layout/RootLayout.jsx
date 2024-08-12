import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/UI/Navbar/Navbar";
import Sidebar from "../components/UI/Sidebar/Sidebar";
import Footer from "../components/UI/Footer/Footer";
import "react-toastify/dist/ReactToastify.css"
import { ToastContainer } from "react-toastify";
function RootLayout() {
  return (
    <>
      <header className="sticky-top">
        <Sidebar />
        <Navbar />
      </header>
      <main>
        <Outlet />
        <ToastContainer/>
      </main>
      <footer>
        <Footer/>
      </footer>
    </>
  );
}

export default RootLayout;
