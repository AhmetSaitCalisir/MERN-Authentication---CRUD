import { Link } from "react-router-dom";

import {
  PersonCircle,
  DoorClosedFill,
  DoorOpenFill,
  PersonPlusFill,
} from "react-bootstrap-icons";

const Navbar = ({ history }) => {
  const logoutHandler = (e) => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("username");
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col">
          <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <Link className="navbar-brand" to="/">
              MERN Authentication & CRUD
            </Link>
            <button
              className="navbar-toggler"
              type="button"
              data-toggle="collapse"
              data-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>

            <div
              className="collapse navbar-collapse"
              id="navbarSupportedContent"
            >
              <ul className="navbar-nav mr-auto">
                <li className="nav-item">
                  <Link className="nav-link" to="/">
                    Home
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/customers">
                    Customers
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/createcustomer">
                    Create Customer
                  </Link>
                </li>
              </ul>
              <ul className="form-inline my-2 my-lg-0 navbar-nav">
                {localStorage.getItem("authToken") ? (
                  <li className="nav-item dropdown">
                    <span
                      className="nav-link dropdown-toggle"
                      href="#"
                      id="navbarDropdown"
                      role="button"
                      data-toggle="dropdown"
                      aria-haspopup="true"
                      aria-expanded="false"
                    >
                      <PersonCircle /> {localStorage.getItem("username")}
                    </span>
                    <div
                      className="dropdown-menu"
                      aria-labelledby="navbarDropdown"
                    >
                      <Link
                        className="dropdown-item"
                        onClick={logoutHandler}
                        to="/"
                      >
                        <DoorClosedFill /> Sign out
                      </Link>
                    </div>
                  </li>
                ) : (
                  <>
                    <li className="nav-item">
                      <Link className="nav-link" to="/login">
                        <DoorOpenFill /> Login
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link" to="/register">
                        <PersonPlusFill /> Register
                      </Link>
                    </li>
                  </>
                )}
              </ul>
            </div>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
