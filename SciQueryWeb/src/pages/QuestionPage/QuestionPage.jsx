import React from "react";
import { Outlet } from "react-router-dom";

function QuestionPage() {
  return (
    <div>
      <h2>Questions</h2>
      <hr />
      <Outlet />
    </div>
  );
}

export default QuestionPage;
