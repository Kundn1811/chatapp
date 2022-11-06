const asyncHandler = require("express-async-handler");
const generateToken = require("../config/generateToken");
const userModel = require("../model/user.model");
const bcrypt = require("bcryptjs");

/*____________________________Registration_____________________
  method :- POST
   body : email,password,name
   api-endpoint :- user/signup
*/

const registration = asyncHandler(async (req, res) => {
  const { name, email, password, image } = req.body;
  if (!name || !email || !password) {
    res.status(400);
    throw new Error("Plaese Enter all the Fields");
  }

  const exists = await userModel.findOne({ email });

  if (exists) {
    res.status(400);
    throw new Error("Email already exists");
  }

  await bcrypt.hash(password, 8, (err, hash) => {
    if (err) {
      res.status(400);
      throw new Error("Error occur while bcrypting");
    }

    const user = userModel.create({
      name,
      email,
      password: hash,
      image,
    });

    if (user) {
      res
        .status(201)
        .send({ registration: true, token: generateToken(user._id) });
    } else {
      res.status(400);
      throw new Error("Registration failed");
    }
  });
});

/* ______________________ Login _______________________
   method :- POST
   body : email,password
   api-endpoint :- user/login
   
*/

const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await userModel.findOne({ email });

  if (!user) {
    return res.status(401).send("invalid credential");
  }

  const hashPassword = user.password;

  await bcrypt.compare(password, hashPassword, (err, result) => {
    if (err) {
      res.status(401);
      throw new Error("Invalid Email or Password");
    }
    if (result) {
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        image: user.image,
        token: generateToken(user._id),
      });
    }
  });
});

/*____________________getting users__________________________________
  method : GET,
  query : name or email , accepts regex
  api-endpoint :- /user?search=""
*/
const allUser = asyncHandler(async (req, res) => {
  const keyword = req.query.search
    ? {
        $or: [
          { name: { $regex: req.query.search, $options: "i" } },
          { email: { $regex: req.query.search, $options: "i" } },
        ],
      }
    : {};

  const users = await userModel
    .find(keyword)
    .find({ _id: { $ne: req.user._id } });

  res.send(users);
});

module.exports = { registration, login, allUser };
