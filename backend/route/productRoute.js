const { authentication, restrictTo } = require("../controller/authController");
const {
  createProduct,
  getAllProducts,
  getProductsById,
  updateProduct,
  deleteProduct,
} = require("../controller/productController");

const router = require("express").Router();

router
  .route("/")
  .post(authentication, restrictTo("1"), createProduct)
  .get(authentication, getAllProducts);

router
  .route("/:id")
  .get(authentication, restrictTo("1"), getProductsById)
  .patch(authentication, restrictTo("1"), updateProduct)
  .delete(authentication, restrictTo("1"), deleteProduct);
module.exports = router;
