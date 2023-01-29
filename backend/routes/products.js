const {
  getProducts,
  newProduct,
  getSingleProduct,
  updateProduct,
  deleteProduct,
} = require("../controller/productController");

const router = require("express").Router();

router.post("admin/product/newproduct", newProduct);
router.get("/allProducts", getProducts);
router.get("/product/:id", getSingleProduct);
router.put("/admin/product/:id", updateProduct);
router.delete("/admin/product/:id", deleteProduct);

module.exports = router;
