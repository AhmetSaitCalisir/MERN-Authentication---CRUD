const express = require("express");
const {
  updateCustomer,
  getCustomers,
  createCustomer,
  getCustomer,
  deleteCustomer,
} = require("../controllers/customer");
const { protect } = require("../middleware/auth");

const router = express.Router();

router.route("/").get(protect, getCustomers);
router.route("/:id").get(protect, getCustomer);
router.route("/").post(protect, createCustomer);
router.route("/:id").delete(protect, deleteCustomer);
router.route("/:id").patch(protect, updateCustomer);

module.exports = router;
