import React, { useEffect, useState } from "react";
import "./NoConnection.css";
import { NavLink } from "react-router-dom";
function NoConnection() {
  return (
    <>
      <div className="connection-loader-overlay">
        <img src="../../public/NoSignal.gif" />
        <h1>Signal yo'q</h1>   
        <br />
        <br />
        <p>Iltimos internet aloqangizni tekshiring va sahifani yangilang.</p>   
        <div className="d-flex justify-content-between">
        <p>Agar qandaydir xatoliklar mavjud bo'lsa &nbsp;</p> <NavLink to={`/Contact`}>biz bilan bog'laning</NavLink>   
        <br />
        <br />
        </div>
        <hr />
      </div>
    </>
  );
}

export default NoConnection;
