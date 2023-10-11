const mongoose = require("mongoose");
// mongoose connection here
mongoose.set("strictQuery", true);

const Database = () => {
  mongoose
    .connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log("connected to mongo");
    });
};

module.exports = Database;
