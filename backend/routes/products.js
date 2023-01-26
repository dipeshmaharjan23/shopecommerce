const { getProducts, newProduct } = require("../controller/productController");

const router = require("express").Router();

router.get("/product", getProducts);
router.post("/product/new", newProduct);
module.exports = router;
