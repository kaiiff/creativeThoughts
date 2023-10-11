const express = require("express");
const {
  addProduct,
  getProductUser,
  updateProduct,
  deleteProductById,
  getByUserId,
} = require("../controller/productController");
const router = express.Router();
const upload = require("../common/multer");

router.post("/addProduct", upload.array("image", 50), addProduct);
router.get("/getProductData", getProductUser);
router.get("/getProduct/:id", getByUserId);
router.put("/update-product/:id", upload.single("image"), updateProduct);
router.delete("/delete-product/:id", deleteProductById);

module.exports = router;
