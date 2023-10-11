const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
  email: {
    type: String,
  },

  password: {
    type: String,
  },
});

const userModel = mongoose.model("User", userSchema);
module.exports = userModel;
