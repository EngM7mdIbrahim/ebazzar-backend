const authRouter = require("express").Router();
const jwt = require('jsonwebtoken');
require('dotenv').config()
const bcrypt = require("bcryptjs");
const User = require("../models/user");
const { getErrorBody, validateProperties } = require("./helper");

authRouter.post("/signup", async (req, res) => {
  const { email, name, password, confirmPassword } = req.body;
  const checkMessage = validateProperties(req.body, ["email", "name", "password", "confirmPassword"]);
  if(checkMessage){
    res.status(401).send(getErrorBody(checkMessage));
    return; 
  }

  if (password !== confirmPassword) {
    res
      .status(401)
      .send(getErrorBody("Password and Confirm Password doesn't match!"));
    return;
  }

  const existingUser = await User.findOne({ email: email });
  if (existingUser) {
    res.status(401).send(getErrorBody("A user already exists with this email"));
    return;
  }

  //Password Generation
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);

  //Save User
  try {
    const savedUser = await new User({ name, email, password: hash }).save();
    res.status(201).send({ message: "User created!", id: savedUser.id });
    return;
  } catch (e) {
    console.error(e.message);
    res.status(501).send(getErrorBody(e.message));
    return;
  }
});

authRouter.post("/signin", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(401).send(getErrorBody("All fields are required!"));
    return;
  }

  const existingUser = await User.findOne({ email: email });
  if (!existingUser) {
    res
      .status(401)
      .send(
        getErrorBody(
          "There is no user with this email, may be you can sign in."
        )
      );
    return;
  }

  const hashedPassword = existingUser.password;
  const match = await bcrypt.compare(password,hashedPassword);
  if(match){
    const payload = {
      id: existingUser.id,
      email: existingUser.email,
    };
    const accessToken = jwt.sign(payload , process.env.ACCESS_TOKEN_SECRET);
    res.status(200).send({message: 'User is signed in!', accessToken});
    return;
  }else{
    res.status(401).send(getErrorBody("Invalid password !"));
    return;
  }

});

module.exports = authRouter;
