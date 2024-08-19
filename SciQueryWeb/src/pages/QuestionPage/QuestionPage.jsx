import React from "react";
import { NavLink, Outlet } from "react-router-dom";

function QuestionPage() {
  return (
    <div>
      <div className="d-flex justify-content-between align-items-center">
        <div></div>
        <NavLink className="button-5" role="button" to='/new'>Ask question</NavLink>
      </div><hr />
      <Outlet />
    </div>
  );
}

export default QuestionPage;
