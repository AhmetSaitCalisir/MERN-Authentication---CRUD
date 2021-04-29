const mongoose = require("mongoose");

const CustomerSchema = new mongoose.Schema({
  managerName: {
    type: String,
    required: [true, "Please provide manager name"],
  },
  companyName: {
    type: String,
    required: [true, "Please provide company name"],
    minLength: [
      3,
      "Please enter a valid company name with more than 3 letters",
    ],
  },
  city: {
    type: String,
    required: [true, "Please indicate the city where the company is located"],
  },
  district: {
    type: String,
    required: [
      true,
      "Please indicate the district where the company is located",
    ],
  },
  email: {
    type: String,
    required: [true, "Please provide company email address"],
    unique: true,
    match: [
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      "Please provide a valid email",
    ],
  },
});

const Customer = mongoose.model("Customer", CustomerSchema);

module.exports = Customer;
