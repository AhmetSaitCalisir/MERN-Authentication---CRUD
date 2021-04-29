exports.getCustomers = (req, res, next) => {
  res.status(200).json({
    success: true,
    data: "Customers",
  });
};

exports.getCustomer = (req, res, next) => {
  res.status(200).json({
    success: true,
    data: `Customer ${req.params.id}`,
  });
};

exports.createCustomer = (req, res, next) => {
  res.status(200).json({
    success: true,
    data: "Customer Created",
  });
};

exports.updateCustomer = (req, res, next) => {
  res.status(200).json({
    success: true,
    data: `Customer ${req.params.id} Updated`,
  });
};

exports.deleteCustomer = (req, res, next) => {
  res.status(200).json({
    success: true,
    data: `Customer ${req.params.id} Deleted`,
  });
};
