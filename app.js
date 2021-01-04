const express = require("express"); // requiring module express
const app = express(); // initialized express

const meetingRoutes = require("./meeting"); // made separate routes in each file to make code more modular
const participantRoutes = require("./participants");
const bodyParser = require("body-parser"); // package for reading jso
const mongoose = require("mongoose"); // npm package for better interaction with the mongo db database
const morgan = require("morgan"); // method for better code login
app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/meetings", meetingRoutes);
app.use("/participants", participantRoutes);
mongoose.connect(
  "mongodb+srv://nodeishowicode:nodeishowicode@cluster0.wf4jx.mongodb.net/node-shop?retryWrites=true&w=majority",
  { useNewUrlParser: true, useUnifiedTopology: true }
); // mongo db connect used for connecting to mongodb atlas the mongo cloud server
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin",
    "X-Requested-With",
    "Content-Type",
    "Accept",
    "Authorization"
  );
  if (req.method === "OPTIONS") {
    // List of methods allowed for CORS
    res.header(
      "Access-Control-Allow-Methods",
      "PUT",
      "POST",
      "PATCH",
      "DELETE",
      "GET"
    );
  }
  next(); // passing on after allowing CORS (cross origin resource sharing)
});
app.use((req, res, next) => {
  const error = new Error("Not found");
  error.status = 404;
  next(error);
});
app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message,
    },
  });
});
