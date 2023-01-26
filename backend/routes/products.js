const getProducts = require("../controller/productController");

const router = require("express").Router();

router.get("/products", getProducts);
module.exports = router;
