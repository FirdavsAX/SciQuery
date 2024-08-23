import React from "react";
import { NavLink, Outlet, useOutletContext } from "react-router-dom";

function QuestionPage() {
  const [search,setSearch] = useOutletContext();
  return (
    <div>
      <div className="d-flex justify-content-between align-items-center">
        <div></div>
        <NavLink className="button-5" role="button" to='/new'>Savol so'rang</NavLink>
      </div><hr />
      <Outlet context={[search,setSearch]}/>
    </div>
  );
}

export default QuestionPage;
