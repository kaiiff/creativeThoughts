const express = require("express");
const app = express();
const bodyParser = require("body-parser");
// dotEnv file extend here
const dotEnv = require("dotenv");
dotEnv.config();

const userRoutes = require("./router/userRouter");
const productRoutes = require("./router/productRouter");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// For accessing  files
app.use("/public/images", express.static("public/images"));

// routers call here
app.use("/api", userRoutes);
app.use("/product", productRoutes);

// db call here
const DB = require("./database/connection");
DB();

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
