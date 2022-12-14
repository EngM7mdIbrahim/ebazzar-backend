const express = require("express");
const app = express();
const mongoose = require("mongoose");
const {DB_CONN_STRING, DB_LOCAL_CONN_STRING} = require("./constants/cosntants");

// All router imports
const authRouter = require("./routes/auth.route.js");
const adsRouter = require('./routes/ads.route.js');
const categoriesRouter = require('./routes/categories.route.js');
const { authAccessToken } = require("./constants/middleWares");

//setup
mongoose
  .connect(DB_LOCAL_CONN_STRING)
  .then(() => console.log("Connected to DB!"))
  .catch((err) =>
    console.error("Cannot connect to the DB with the following error: ", err)
  );

//Middle ware
app.use(express.json());

//Use all routes
app.use("/auth", authRouter);
app.use(authAccessToken);
app.use('/ads', adsRouter);
app.use('/categories', categoriesRouter);

app.listen(8000);
