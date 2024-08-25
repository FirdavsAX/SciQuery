import React, { useEffect } from "react";
import "./SpinnerMini.css";
function SpinnerMini(showImg) {

  useEffect(() => {
    setTimeout(() => {
      showImg = (false);
    }, 3000);
  });
  return (
    <>
      <div className="mini-loader-overlay">
        {showImg ? <img src="../../public/loadingMini.gif" /> : <h3></h3>}
      </div>
    </>
  );
}

export default SpinnerMini;
