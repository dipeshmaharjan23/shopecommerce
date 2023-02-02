const express = require("express");
const router = express.Router();

const {
  newOrder,
  getSingleOrder,
  myOrders,
  getAllOrders,
  updateOrder,
  deleteOrder,
} = require("../controller/orderController");
const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");

router.post("/order/new", isAuthenticatedUser, newOrder);

router.get("/order/:id", isAuthenticatedUser, getSingleOrder);
router.get("/order/myorders", isAuthenticatedUser, myOrders);

router.get(
  "admin/orders",
  isAuthenticatedUser,
  authorizeRoles("admin"),
  getAllOrders
);

router.put(
  "admin/order/:id",
  isAuthenticatedUser,
  authorizeRoles("admin"),
  updateOrder
);

router.delete("/admin/order/:id", deleteOrder);

module.exports = router;
