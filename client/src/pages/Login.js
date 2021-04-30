import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Login = ({ history }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (localStorage.getItem("authToken")) {
      history.push("/");
    }
  }, [history]);

  const loginHandler = async (e) => {
    e.preventDefault();

    const config = {
      header: {
        "Content-Type": "application/json",
      },
    };

    try {
      const { data } = await axios.post(
        "http://localhost:4545/api/auth/login",
        { email, password },
        config
      );

      localStorage.setItem("authToken", data.token);
      localStorage.setItem("username", data.username);

      history.push("/");
    } catch (error) {
      setError(error.response.data.error);
      setTimeout(() => {
        setError("");
      }, 5000);
    }
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col d-flex justify-content-center">
          <form onSubmit={loginHandler}>
            {error && (
              <div className="form-group">
                <div className="alert alert-danger" role="alert">
                  {error}
                </div>
              </div>
            )}
            <div className="form-group">
              <label htmlFor="txt_email">Email address</label>
              <input
                type="email"
                className="form-control"
                required
                id="txt_email"
                aria-describedby="emailHelp"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              ></input>
              <small id="emailHelp" className="form-text text-muted">
                We'll never share your email with anyone else.
              </small>
            </div>
            <div className="form-group">
              <label htmlFor="txt_password">Password</label>
              <input
                type="password"
                className="form-control"
                required
                id="txt_password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              ></input>
            </div>
            <button
              type="submit"
              className="btn btn-outline-primary btn-block btn-sm"
            >
              Login
            </button>
            <small id="goLogin" className="form-text text-muted">
              Don't have account?
              <Link to="/register">Register</Link>
            </small>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
