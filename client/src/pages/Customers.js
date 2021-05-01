import { useState, useEffect } from "react";
import axios from "axios";
import CustomerCart from "../components/CustomerCart";
import { unauthorized } from "../utils/Errors";

const Customers = ({ history }) => {
  const [error, setError] = useState("");
  const [customers, setCustomers] = useState([]);

  const colStyle = {
    minWidth: "300px",
  };

  useEffect(() => {
    const fetchCustomersData = async () => {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      };

      try {
        const { data } = await axios.get(
          "http://localhost:4545/api/customer",
          config
        );

        setCustomers(data.data);
      } catch (error) {
        if (error.response.status === 401) unauthorized(error, history);

        setError(error.response.data.error);
        setTimeout(() => {
          setError("");
        }, 5000);
      }
    };

    fetchCustomersData();
  }, [history]);

  return error ? (
    <div
      className="container
      "
    >
      <div className="row">
        <div className="col">
          <div className="alert alert-danger" role="alert">
            {error}
          </div>
        </div>
      </div>
    </div>
  ) : (
    <div className="container">
      <div className="row">
        {customers.map((customer) => (
          <div className="col" key={customer._id} style={colStyle}>
            <CustomerCart customer={customer} key={customer._id} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Customers;
