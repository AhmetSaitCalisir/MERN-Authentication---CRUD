import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { unauthorized } from "../utils/Errors";

import {
  EnvelopeFill,
  PersonBadgeFill,
  GeoAltFill,
  GearFill,
} from "react-bootstrap-icons";

const CustomerCart = ({ customer, history, onDelete }) => {
  const colStyle = {
    marginBottom: "5px",
    marginTop: "5px",
  };

  const [customerLink, setCustomerLink] = useState("");
  useEffect(() => {
    setCustomerLink(`/updatecustomer/${customer._id}`);
  }, [customer._id]);

  const deleteCustomer = async () => {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("authToken")}`,
      },
    };

    try {
      await axios.delete(
        `http://localhost:4545/api/customer/${customer._id}`,
        config
      );
      onDelete();
    } catch (error) {
      if (error.response.status === 401) unauthorized(error, history);
      console.error(error);
    }
  };

  return (
    <div className="container-fluid" style={colStyle}>
      <div className="row">
        <div className="col">
          <div className="card">
            <div className="card-header">
              <GeoAltFill /> {customer.city}/{customer.district}
            </div>
            <div className="card-body">
              <h5 className="card-title">{customer.companyName}</h5>
              <p className="card-text">
                <PersonBadgeFill /> {customer.managerName}
              </p>
              <p className="card-text">
                <a href={"mailto:" + customer.email}>
                  <EnvelopeFill /> {customer.email}
                </a>
              </p>
              <div className="row">
                <div className="col">
                  <Link
                    to={customerLink}
                    className="btn btn-outline-warning btn-sm btn-block"
                  >
                    <GearFill /> Update
                  </Link>
                </div>
                <div className="col">
                  <button
                    className="btn btn-outline-danger btn-sm btn-block"
                    onClick={deleteCustomer}
                  >
                    <GearFill /> Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerCart;
