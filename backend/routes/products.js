const {
  newProduct,
  getProducts,
  getSingleProduct,
  updateProduct,
  deleteProduct,
  createProductReview,
  getProductReviews,
} = require("../controller/productController");

const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");

const router = require("express").Router();

router.get(
  "/allproducts",
  isAuthenticatedUser,
  authorizeRoles("admin"),
  getProducts
);
router.post("/admin/newproduct", newProduct);
router.get("/product/:id", getSingleProduct);
router
  .put(
    "/admin/product/:id",
    isAuthenticatedUser,
    authorizeRoles("admin"),
    updateProduct
  )
  .delete(
    "/admin/product/:id",
    isAuthenticatedUser,
    authorizeRoles("admin"),
    deleteProduct
  );

router.put("/review", isAuthenticatedUser, createProductReview);
router.get("/reviews", isAuthenticatedUser, getProductReviews);

module.exports = router;
