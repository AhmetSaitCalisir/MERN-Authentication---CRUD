const Customer = require("../models/Customer");
const ErrorResponse = require("../utils/errorResponse");

exports.getCustomers = async (req, res, next) => {
  try {
    const customers = await Customer.find();

    if (customers.length === 0)
      return next(
        new ErrorResponse(`There are currently no customer to show`, 400)
      );

    res.status(200).json({
      success: true,
      data: customers,
    });
  } catch (error) {
    next(error);
  }
};

exports.getCustomer = async (req, res, next) => {
  try {
    const customer = await Customer.findById(req.params.id);

    if (!customer)
      return next(
        new ErrorResponse(
          `There's no customer with id of ${req.params.id}`,
          400
        )
      );

    res.status(200).json({
      success: true,
      data: customer,
    });
  } catch (error) {
    next(error);
  }
};

exports.createCustomer = async (req, res, next) => {
  const { managerName, companyName, city, district, email } = req.body;

  try {
    const customer = await Customer.create({
      managerName,
      companyName,
      city,
      district,
      email,
    });

    res.status(201).json({
      success: true,
      data: customer,
    });
  } catch (error) {
    next(error);
  }
};

exports.updateCustomer = async (req, res, next) => {
  const { managerName, companyName, city, district, email } = req.body;
  try {
    const customer = await Customer.updateOne(
      { _id: req.params.id },
      { $set: { managerName, companyName, city, district, email } }
    );

    res.status(200).json({
      success: true,
      data: customer,
    });
  } catch (error) {
    if (error.name == "CastError")
      return next(
        new ErrorResponse(
          `There's no customer with id of ${req.params.id}`,
          400
        )
      );

    next(error);
  }
};

exports.deleteCustomer = async (req, res, next) => {
  try {
    const customer = await Customer.remove({ _id: req.params.id });

    res.status(200).json({
      success: true,
      data: customer,
    });
  } catch (error) {
    if (error.name == "CastError")
      return next(
        new ErrorResponse(
          `There's no customer with id of ${req.params.id}`,
          400
        )
      );

    next(error);
  }
};
