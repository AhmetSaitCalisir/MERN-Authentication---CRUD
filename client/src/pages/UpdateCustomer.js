import { useState, useEffect } from "react";
import axios from "axios";
import { unauthorized } from "../utils/Errors";

const UpdateCustomer = ({ match, history }) => {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [managerName, setManagerName] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [city, setCity] = useState("");
  const [district, setDistrict] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    const fetchCustomerData = async () => {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      };

      try {
        const { data } = await axios.get(
          `http://localhost:4545/api/customer/${match.params.id}`,
          config
        );

        setManagerName(data.data.managerName);
        setCompanyName(data.data.companyName);
        setCity(data.data.city);
        setDistrict(data.data.district);
        setEmail(data.data.email);
      } catch (error) {
        if (error.response.status === 401) unauthorized(error, history);

        setError(error.response.data.error);
        setTimeout(() => {
          setError("");
        }, 5000);
      }
    };

    const refreshToken = async () => {
      const userid = localStorage.getItem("userid");

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      };

      try {
        const { data } = await axios.post(
          "http://localhost:4545/api/auth/refreshtoken",
          {
            userid,
          },
          config
        );
        localStorage.setItem("authToken", data.token);
      } catch (error) {
        unauthorized(error, history);
      }
    };

    refreshToken();
    fetchCustomerData();
  }, [history, match.params.id]);

  const updateCustomer = async (e) => {
    e.preventDefault();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("authToken")}`,
      },
    };

    try {
      const { data } = await axios.patch(
        `http://localhost:4545/api/customer/${match.params.id}`,
        {
          managerName,
          companyName,
          city,
          district,
          email,
        },
        config
      );

      setSuccess(
        `${data.data.companyName} company has been successfully updated.`
      );
      setTimeout(() => {
        setSuccess("");
      }, 5000);
    } catch (error) {
      if (error.response.status === 401) {
        alert("Your session has expired. Please login again.");
        localStorage.removeItem("authToken");
        localStorage.removeItem("username");
        history.push("/login");
      }

      setError(error.response.data.error);
      setTimeout(() => {
        setError("");
      }, 5000);
    }
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col">
          <form onSubmit={updateCustomer}>
            {error && (
              <div className="form-group">
                <div className="alert alert-danger" role="alert">
                  {error}
                </div>
              </div>
            )}
            {success && (
              <div className="form-group">
                <div className="alert alert-success" role="alert">
                  {success}
                </div>
              </div>
            )}
            <div className="form-group">
              <label htmlFor="txt_companyName">Company Name</label>
              <input
                type="text"
                className="form-control"
                id="txt_companyName"
                placeholder="Apple Inc."
                required
                minLength="3"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="txt_managerName">Manager Name</label>
              <input
                type="text"
                className="form-control"
                id="txt_managerName"
                placeholder="Steve Jobs"
                required
                value={managerName}
                onChange={(e) => setManagerName(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="txt_email">Email address</label>
              <input
                type="email"
                className="form-control"
                id="txt_email"
                placeholder="company@example.com"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="txt_city">City</label>
              <input
                type="text"
                className="form-control"
                id="txt_city"
                placeholder="Manisa"
                required
                value={city}
                onChange={(e) => setCity(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="txt_district">District</label>
              <input
                type="text"
                className="form-control"
                id="txt_district"
                placeholder="Turgutlu"
                required
                value={district}
                onChange={(e) => setDistrict(e.target.value)}
              />
            </div>
            <div className="form-group">
              <button
                type="submit"
                className="btn btn-outline-success btn-block btn-sm"
              >
                Create
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateCustomer;
