import { useState, useEffect } from "react";
import axios from "axios";
import CustomerCart from "../components/CustomerCart";

const Customers = ({ history }) => {
  const [error, setError] = useState("");
  const [customers, setCustomers] = useState([]);

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
        console.log(data);
        setCustomers(data.data);
      } catch (error) {
        console.log(error);
        localStorage.removeItem("authToken");
        localStorage.removeItem("username");
        setError("You are not authorized please login");
        history.push("/login");
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
          <div className="col" key={customer._id}>
            <CustomerCart customer={customer} key={customer._id} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Customers;
