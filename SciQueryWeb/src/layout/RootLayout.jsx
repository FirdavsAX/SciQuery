import React, { useState } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import Navbar from "../components/UI/Navbar/Navbar";
import Sidebar from "../components/UI/Sidebar/Sidebar";
import Footer from "../components/UI/Footer/Footer";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

function RootLayout() {
  const navigate = useNavigate()
  const [search, setSearch] = useState("");
  const handleSearch = (searchQuery) => {
    setSearch(searchQuery);
  };
  return (
    <>  
      <Navbar handleSearch={handleSearch} />
      <header className="sticky-top">
        <Sidebar />
      </header>
      <main>
        <Outlet context={[search,setSearch]}/>
        <ToastContainer />
      </main>
      <footer>
        <Footer />
      </footer>
    </>
  );
}

export default RootLayout;
