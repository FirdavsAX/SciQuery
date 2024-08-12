import { useRef, useEffect, useState } from "react";
import http from "../../services/index";
const Login = ({setToken}) => {
  const loginInput = useRef(null);
  const passwordInput = useRef(null);
  const [hasError, setHasError] = useState(false);

  const onLogin = (e) => {
    e.preventDefault();
    http
      .post("account/login", {
        userName: loginInput.current.value,
        password: passwordInput.current.value,
      })
      .then((res) => {
        alert("Success");
        window.localStorage.setItem("token", res.data);
        setToken(res.data);
        console.log(res.data)

      })
      .catch((error) => {
        setHasError(true);
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
              <h2>Login</h2>
            </div>
            <div className="card-body">
              {hasError ? (
                <div className="alert alert-danger" role="alert">
                  Incorrect login or password!
                </div>
              ) : (
                <></>
              )}
              <form onSubmit={(e) => onLogin(e)}>
                <div className="form-group">
                  <label htmlFor="exampleInputEmail1">User name</label>
                  <input
                    ref={loginInput}
                    type="text"
                    className="form-control"
                    id="exampleInputEmail1"
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
export default Login;
