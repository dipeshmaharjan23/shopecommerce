const {
  newProduct,
  getProducts,
  getSingleProduct,
  updateProduct,
  deleteProduct,
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
// router.delete("/admin/product/:id", isAuthenticatedUser, deleteProduct);

module.exports = router;
