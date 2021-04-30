import { Link } from "react-router-dom";

import { PersonCircle, DoorClosedFill } from "react-bootstrap-icons";

const Navbar = () => {
  return (
    <div className="container">
      <div className="row">
        <div className="col">
          <nav class="navbar navbar-expand-lg navbar-light bg-light">
            <Link class="navbar-brand" to="/">
              MERN Authentication & CRUD
            </Link>
            <button
              class="navbar-toggler"
              type="button"
              data-toggle="collapse"
              data-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span class="navbar-toggler-icon"></span>
            </button>

            <div class="collapse navbar-collapse" id="navbarSupportedContent">
              <ul class="navbar-nav mr-auto">
                <li class="nav-item">
                  <Link class="nav-link" to="/">
                    Home
                  </Link>
                </li>
                <li class="nav-item">
                  <Link class="nav-link" to="/customers">
                    Customers
                  </Link>
                </li>
                <li class="nav-item">
                  <Link class="nav-link" to="/createcustomer">
                    Create Customer
                  </Link>
                </li>
              </ul>
              <ul class="form-inline my-2 my-lg-0 navbar-nav">
                <li class="nav-item dropdown">
                  <span
                    class="nav-link dropdown-toggle"
                    href="#"
                    id="navbarDropdown"
                    role="button"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    <PersonCircle /> User
                  </span>
                  <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                    <Link class="dropdown-item" to="/exit">
                      <DoorClosedFill /> Sign out
                    </Link>
                  </div>
                </li>
              </ul>
            </div>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
