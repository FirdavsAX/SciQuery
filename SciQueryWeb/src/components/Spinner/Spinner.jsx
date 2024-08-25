import React, { useEffect, useState } from "react";
import "./Spinner.css";
function Spinner(showImg) {

  useEffect(() => {
    setTimeout(() => {
      showImg = (false);
    }, 3000);
  });
  return (
    <>
      <div className="loader-overlay">
        {showImg ? <img src="../../public/loading.gif" /> : <h3></h3>}
      </div>
    </>
  );
}

export default Spinner;
