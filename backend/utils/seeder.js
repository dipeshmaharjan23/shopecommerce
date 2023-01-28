const Product = require("../models/product");
const products = require("../data");
const connectDatabase = require("../config/database");

const dotenv = require("dotenv");

dotenv.config({ path: "backend/config/config.env" });
connectDatabase();
const Seeder = async () => {
  try {
    await Product.deleteMany();
    console.log("product deleted");
    await Product.insertMany(products);
    console.log("all products updated");
    process.exit();
  } catch (error) {
    console.log(error.message);
  }
};

Seeder();
