const Product = require("../models/product");
const ErrorHandler = require("../utils/errorHandler");
const APIFeatures = require("../utils/apiFeatures");
// const catchAsyncErrors = require("../middleware/catchAsyncErrors");

const newProduct = async (req, res) => {
  req.body.User = req.body.id;

  const product = await Product.create(req.body);
  res.status(201).json({
    success: true,
    product,
  });
};

const getProducts = async (req, res) => {
  const resPerPage = 4;
  const productCount = await Product.countDocuments();

  const apiFeatures = new APIFeatures(Product.find(), req.query)
    .search()
    .filter()
    .pagination(resPerPage);
  // const products = await Product.find(),;

  const products = await apiFeatures.query;

  res.status(200).json({
    success: true,
    count: products.length,
    products,
    productCount,
  });
};

const getSingleProduct = async (req, res, next) => {
  const id = req.params.id;
  const product = await Product.findById(id);

  // if (!product) {
  //   return res.status(404).json({
  //     success: false,
  //     message: "Product not found",
  //   });
  // }
  if (!product) {
    return next(new ErrorHandler("Product not found", 404));
  }

  res.status(200).json({
    success: true,
    product,
  });
};

const updateProduct = async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    return res.status(404).json({
      success: false,
      message: "Product not found",
    });
  }
  const updateProduct = await Product.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    }
  );
  res.status(200).json({
    success: true,
    updateProduct,
  });
};

const deleteProduct = async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    return res.status(404).send({
      success: false,
      message: "Product not found",
    });
  }

  await product.remove();

  res.status(200).json({
    success: true,
    message: "Product deleted successfully",
    // deleteProduct,
  });
};

// create new review

const createProductReview = async function (req, res) {
  const { rating, comment, productId } = req.body;

  const review = {
    user: req.user._id,
    name: req.body.name,
    rating: Number(rating),
    comment,
  };

  const product = await Product.findById(productId);

  const isReviewed = product.reviews.find(
    (r) => r.user.toString() === req.user._id.toString()
  );
  if (isReviewed) {
    product.reviews.forEach((review) => {
      if (review.user.toString() === req.user._id.toString()) {
        review.comment = comment;
        review.rating = rating;
      }
    });
  } else {
    product.reviews.push(review);
    product.numOfReviews = product.reviews.length;
  }

  product.ratings =
    product.raviews.reduce((acc, item) => item.rating + acc, 0) /
    product.reviews.length;

  await product.save({ validateBeforeSave: false });

  res.status(200).json({
    success: true,
  });
};

const getProductReviews = async (req, res) => {
  const product = await Product.findById(req.query.id);

  res.status(200).json({
    success: true,
    reviews: product.reviews,
  });
};

module.exports = {
  newProduct,
  getProducts,
  getSingleProduct,
  updateProduct,
  deleteProduct,
  createProductReview,
  getProductReviews,
};
