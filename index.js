/** @format */

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

//configure .env
require("dotenv").config();

//define app
const app = express();

//middlewares
app.use(cors());
// app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

//load static page(index.html)
app.use(express.static("public"));
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/views/index.html");
});

//connect to database and start server
const uri = process.env.MONGO_URI;
const port = process.env.PORT || 3000;
mongoose
  .connect(uri, {
    maxPoolSize: 50,
    wtimeoutMS: 2500,
    useNewUrlParser: true,
  })
  .catch((err) => {
    console.log(err);
    process.exit(1);
  })
  .then(async (client) => {
    console.log("Connection to DB successful");

    //start server after connection to DB successful
    app.listen(port, () => {
      console.clear();
      console.log(`Listening on port ${port}`);
    });
  });

//import routes
const usersRoute = require("./backend/routes/users");
const exercisesRoute = require("./backend/routes/exercises");

app.use("/api/users", usersRoute);
app.use("/api/users", exercisesRoute);
