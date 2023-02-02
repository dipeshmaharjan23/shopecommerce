const Order = require("../models/order");
const Product = require("../models/product");

const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");

// create a new order

exports.newOrder = async function (req, res, next) {
  const {
    orderItems,
    shippingInfo,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
    paymentInfo,
  } = req.body;

  const newOrder = await Order.create({
    orderItems,
    shippingInfo,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
    paymentInfo,
    paidAt: Date.now(),
    user: req.user._id,
  });
  res.status(201).json({
    success: true,
    newOrder,
  });
};

// get single order
exports.getSingleOrder = async function (req, res, next) {
  const order = await Order.findById(req.params.id).populate(
    "user",
    "name email"
  );

  if (!order) {
    return next(new ErrorHandler("Order not found", 404));
  }

  res.status(200).json({
    success: true,
    order,
  });
};

// get logged in  user order
exports.myOrders = async function (req, res, next) {
  const orders = await Order.find({ user: req.user.id });

  res.status(200).json({
    success: true,
    orders,
  });
};

// get all orders
exports.getAllOrders = async (req, res) => {
  const orders = await Order.find();

  let totalAmount = 0;
  orders.forEach((order) => {
    totalAmount += order.totalPrice;
  });

  res.status(200).json({
    success: true,
    orders,
    totalAmount,
  });
};

// update orders
exports.updateOrder = async (req, res) => {
  const order = await Order.findById(req.params.id);

  if (order.orderStatus === "delivered") {
    return next(new ErrorHandler("You have already delivered this order", 400));
  }

  order.orderItems.forEach(async (item) => {
    await updateStock(item.product, item.quantity);
  });

  order.orderStatus = req.body.status;
  order.deleveredAt = Date.now();

  await order.save();

  res.status(200).json({
    success: true,
    totalAmount,
  });
};

async function updateStock(id, quantity) {
  const product = await Product.findById(id);
  product.stock = product.stock - stock.quantity;
  await product.save({ validateBeforeSave: false });
}

// delete single order
exports.deleteOrder = async function (req, res, next) {
  const order = await Order.findById(req.params.id);

  if (!order) {
    return next(new ErrorHandler("Order not found", 404));
  }

  await order.remove();

  res.status(200).json({
    success: true,
  });
};
