const Product = require("../model/productModel");

const addProduct = async (req, res) => {
  try {
    const { userId, name, quantity, price } = req.body;

    const addNewProduct = new Product({
      userId: userId,
      name: name,
      quantity: quantity,
      price: price,
    });

    if (req.files) {
      let file = "";
      req.files.forEach(function (files) {
        file = file + files.filename + "," + process.env.BASE_URL;
      });
      file = file.substring(0, file.lastIndexOf(","));
      addNewProduct.image = process.env.BASE_URL + file;
    } else {
      file = null;
    }

    const data = await addNewProduct.save();

    if (!data) {
      return res.send("add product failed");
    } else {
      return res.status(200).json({
        message: "Product add successfully!",
        data: data,
      });
    }
  } catch (error) {
    return res.send(error.message);
  }
};

const getProductUser = async (req, res) => {
  try {
    const getData = await Product.aggregate([
      {
        $lookup: {
          from: "users",
          localField: "userId",
          foreignField: "_id",
          as: "user_details",
        },
      },
    ]);

    if (!getData) {
      return res.send("No Data Found");
    } else {
      return res.status(200).json({
        msg: "Data fetched successfully!",
        data: getData,
      });
    }
  } catch (error) {
    return res.send(error.message);
  }
};

const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const { file } = req;
    let image;
    if (req.file) {
      image = process.env.BASE_URL + file.filename;
    }

    const { name, quantity, price } = req.body;

    const product = await Product.findOne({ _id: id });
    if (!product) {
      return res.status(422).json({
        status: 422,
        message: "Invalid product id",
      });
    }
    const updateProduct = await Product.findOneAndUpdate(
      { _id: id },
      {
        $set: {
          name: name,
          quantity: quantity,
          price: price,
          image: image,
        },
      },
      { new: true }
    );
    return res.status(200).json({
      status: 200,
      message: "product update successfully!",
      data: updateProduct,
    });
  } catch (error) {
    return res.send(error.message);
  }
};

const deleteProductById = async (req, res, next) => {
  try {
    const { params } = req;
    const { id } = params;

    const dataDelete = await Product.findOne({ userId: id });
    if (!dataDelete) {
      return res.status(404).json({
        status: 404,
        message: "Data not found!",
      });
    }
    await Product.deleteOne({ userId: id });
    return res.status(200).json({
      status: 200,
      message: "Product deleted successfully!",
    });
  } catch (error) {
    return res.send(error.message);
  }
};

const getByUserId = async (req, res) => {
  try {
    const { id } = req.params;

    const getData = await Product.findOne({ userId: id }).populate({
      path: "userId",
      strictPopulate: false,
      select: "email ",
    });
    if (getData) {
      return res.json({
        status: 200,
        details: getData,
      });
      //   console.log("pass 114 --->", getData);
    } else {
      return res.status(404).json({
        status: 404,
        message: "data fetched failed!",
      });
    }
  } catch (error) {
    return res.send(error.message);
  }
};

module.exports = {
  addProduct,
  getProductUser,
  updateProduct,
  deleteProductById,
  getByUserId,
};
