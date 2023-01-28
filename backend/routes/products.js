const {
  getProducts,
  newProduct,
  getSingleProduct,
  updateProduct,
} = require("../controller/productController");

const router = require("express").Router();

router.post("admin/product/new", newProduct);
router.get("/allProducts", getProducts);
router.get("/product/:id", getSingleProduct);
router.put("/admin/product/:id", updateProduct);

module.exports = router;
