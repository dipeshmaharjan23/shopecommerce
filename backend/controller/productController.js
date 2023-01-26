const Product = require("../models/product");

const newProduct = async (req, res, next) => {
  const product = await Product.create(req.body);
  res.status(201).json({
    success: true,
    data: product,
  });
};

const getProducts = (req, res) => {
  res.status(200).json({
    success: true,
    message: "This route will show all the products in database",
  });
};

module.exports = {
  newProduct,
  getProducts,
};
