const User = require("../model/userModel");
const Joi = require("joi");
const bcrypt = require("bcrypt");

const { encode } = require("../common/token");

async function hashedPassword(password) {
  return await bcrypt.hashSync(password, 10);
}

async function validatePassword(plainpassword, hashedPassword) {
  return await bcrypt.compare(plainpassword, hashedPassword);
}

const registerUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const hash = await hashedPassword(password);
    console.log("req.body.......", req.body);
    console.log("req.body", req.body);

    const schema = await Joi.object({
      email: Joi.string().email().required().messages({
        "string.empty": `email is a required field.`,
        "string.email": `please enter valid email.`,
      }),
      password: Joi.string().min(6).max(16).required().messages({
        "string.empty": `Password is a required field.`,
        "string.min": `Password must be at least 6 characters long.`,
        "string.max": `Password must be at least 16 characters short.`,
      }),
    });
    const validation = schema.validate({
      email: email,
      password: password,
    });
    console.log("validation", validation);

    if (validation.error) {
      return res.status(422).send({
        status: 422,
        message: validation.error.details,
      });
    }

    const isMailExist = await User.findOne({ email });
    if (isMailExist) {
      return res.json({ msg: "This email is already registered!" });
    }

    const addUser = new User({
      email: email,
      password: hash,
    });

    const data = await addUser.save();

    return res.status(200).json({
      msg: "User register successfully!",
      data: data,
    });
  } catch (error) {
    return res.send(error.message);
  }
};

const loginUser = async (req, res) => {
  try {
    let { email, password } = req.body;

    const schema = await Joi.object({
      email: Joi.string().email().required().messages({
        "string.empty": `email is a required field.`,
        "string.email": `please enter valid email.`,
      }),
      password: Joi.string().min(6).max(16).required().messages({
        "string.empty": `Password is a required field.`,
        "string.min": `Password must be at least 6 characters long.`,
        "string.max": `Password must be at least 16 characters short.`,
      }),
    });
    const validation = schema.validate({
      email: email,
      password: password,
    });
    console.log("validation", validation);

    if (validation.error) {
      return res.status(422).send({
        status: 422,
        message: validation.error.details,
      });
    }

    const data = await User.findOne({ email });
    if (!data) {
      return res.send("Email not exist!");
    }

    const checkPassword = await validatePassword(password, data.password);
    if (!checkPassword) {
      return res.json({ msg: "Incorrect pasword!" });
    }

    const token = await encode({
      id: data,
    });

    return res.status(200).json({
      message: "login successfully!",
      token: token,
    });
  } catch (error) {
    return res.send(error.message);
  }
};

module.exports = {
  registerUser,
  loginUser,
};
