const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const apiRouter = require("./routes");
const cors = require("cors");

require("dotenv").config();

app.use(cors());

app.use(bodyParser.json());

mongoose.set("strictQuery", false);
// Connection à la base de données
mongoose
  .connect(
    `mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PASSWORD}@cluster0.ygdxxcd.mongodb.net/?retryWrites=true&w=majority`
  )
  .then(() => {
    console.log("Connected to database!");
  })
  .catch((error) => {
    console.log(error);
  });

app.use("/api", apiRouter);

app.listen(process.env.PORT, function () {
  console.log(`Server started on port ${process.env.PORT}`);
});
