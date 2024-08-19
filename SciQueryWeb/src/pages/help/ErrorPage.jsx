import { NavLink, useLocation } from "react-router-dom";
import { toast } from "react-toastify";

function ErrorPage() {
  const location = useLocation();
  const error = location.state?.error;

  console.log("Error on ErrorPage:", error);

  if (error?.response?.status === 404) {
    return (
      <div className="error-container">
        <h1>👇Page Not Found👇</h1>
        <p>
          The page you are looking for might have been removed or is temporarily unavailable.
        </p>
        <NavLink to="/">Home Page</NavLink>
      </div>
    );
  } else if (error?.response?.status === 401) {
    console.log(error);
    toast.warning(error.message);
    window.history.pushState({}, "LoginPage", "/login");
    return (
      <div className="error-container">
        <h1>Unauthorized</h1>
        <NavLink to="/">Home Page</NavLink>
      </div>
    );
  } else {
    return (
      <div className="error-container">
        <h1>Something went wrong</h1>
        <p>
          There was an unexpected error. Please try again later.
        </p>
        <NavLink to="/">Home Page</NavLink>
      </div>
    );
  }
}

export default ErrorPage;
