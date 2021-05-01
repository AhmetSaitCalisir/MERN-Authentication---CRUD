import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

import {
  EnvelopeFill,
  PersonBadgeFill,
  GeoAltFill,
  GearFill,
} from "react-bootstrap-icons";

const CustomerCart = ({ customer }) => {
  const colStyle = {
    marginBottom: "5px",
    marginTop: "5px",
  };

  const [customerLink, setCustomerLink] = useState("");
  useEffect(() => {
    setCustomerLink(`/updatecustomer/${customer._id}`);
  }, [customer._id]);

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
                  <Link
                    to="/customer"
                    className="btn btn-outline-danger btn-sm btn-block"
                  >
                    <GearFill /> Delete
                  </Link>
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
