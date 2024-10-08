import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import http from "../../services/index";

const Register = ({ setToken }) => {
  const registerInput = useRef(null);
  const passwordInput = useRef(null);
  const emailInput = useRef(null);
  const [hasError, setHasError] = useState(false);
  const navigate = useNavigate(); // Hook for navigation

  const onRegister = (e) => {
    e.preventDefault();
    http
      .post("account/register", {
        email: emailInput.current.value,
        userName: registerInput.current.value,
        password: passwordInput.current.value,
      })
      .then((res) => {
        alert("Success");
        window.localStorage.setItem("token", res.data);
        setToken(res.data);
        navigate("/"); // Navigate to home page
      })
      .catch((error) => {
        setHasError(true);
        throw error;
      });
    console.log("submitted");
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-2"></div>
        <div className="col-md-6">
          <div className="card mt-5">
            <div className="card-header">
              <h2>Register</h2>
            </div>
            <div className="card-body">
              {hasError ? (
                <div className="alert alert-danger" role="alert">
                  Incorrect register or password!
                </div>
              ) : (
                <></>
              )}
              <form onSubmit={(e) => onRegister(e)}>
                <div className="form-group">
                  <label htmlFor="exampleInputEmail1">Email address</label>
                    <input
                    ref={emailInput}
                    type="email"
                    className="form-control"
                    id="exampleInputEmail"
                    aria-describedby="emailHelp"
                    placeholder="Enter email"
                  />
                  <small id="emailHelp" className="form-text text-muted">
                    We'll never share your email with anyone else.
                  </small>
                </div>
                <div className="form-group">
                  <label htmlFor="exampleInput">User name</label>
                  <input
                    ref={registerInput}
                    type="text"
                    className="form-control"
                    id="exampleInput"
                    placeholder="Enter user name"
                  />
                  <small id="emailHelp" className="form-text text-muted">
                    We'll never share your email with anyone else.
                  </small>
                </div>
                <div className="form-group">
                  <label htmlFor="exampleInputPassword1">Password</label>
                  <input
                    ref={passwordInput}
                    type="password"
                    className="form-control"
                    id="exampleInputPassword1"
                    placeholder="Password"
                  />
                </div>

                <button type="submit" className="btn btn-primary">
                  Submit
                </button>
                
              </form>
            </div>
          </div>
        </div>
        <div className="col-md-3"></div>
      </div>
    </div>
  );
};
export default Register;
