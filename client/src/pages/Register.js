import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

import { DoorOpenFill } from "react-bootstrap-icons";

const Register = ({ history }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (localStorage.getItem("authToken")) {
      alert(
        `You are already logged in with the username ${localStorage.getItem(
          "username"
        )}`
      );
      history.push("/");
    }
  }, [history]);

  const registerHandler = async (e) => {
    e.preventDefault();

    const config = {
      header: {
        "Content-Type": "application/json",
      },
    };

    if (password !== confirmPassword) {
      setPassword("");
      setConfirmPassword("");
      setTimeout(() => {
        setError("");
      }, 5000);
      return setError("Passwords do not match");
    }

    try {
      const { data } = await axios.post(
        "http://localhost:4545/api/auth/register",
        {
          username,
          email,
          password,
        },
        config
      );

      localStorage.setItem("username", username);
      localStorage.setItem("authToken", data.token);

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
          <form onSubmit={registerHandler}>
            {error && (
              <div className="form-group">
                <div className="alert alert-danger" role="alert">
                  {error}
                </div>
              </div>
            )}
            <div className="form-group">
              <label htmlFor="txt_userName">User Name</label>
              <input
                type="text"
                className="form-control"
                required
                id="txt_userName"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              ></input>
            </div>
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
            <div className="form-group">
              <label htmlFor="txt_confirmPassword">Confirm Password</label>
              <input
                type="password"
                className="form-control"
                required
                id="txt_confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              ></input>
            </div>
            <button
              type="submit"
              className="btn btn-outline-success btn-block btn-sm"
            >
              Register
            </button>
            <small id="goLogin" className="form-text text-muted">
              Already have account?{" "}
              <Link to="/login">
                <DoorOpenFill /> Login
              </Link>
            </small>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
