const mongoose = require("mongoose");
const { Schema } = mongoose;

const productSchema = new Schema({
  userId: {
    type: mongoose.Types.ObjectId,
    ref: "User",
  },

  name: {
    type: String,
  },

  quantity: {
    type: String,
  },

  price: {
    type: String,
  },

  image: {
    type: [String],
  },
});

const productModel = mongoose.model("Product", productSchema);
module.exports = productModel;
