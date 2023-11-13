const mongoose = require("mongoose");
const express = require("express");
const eventRoute = require("./eventRoutes");
const bodyParser = require("body-parser");



const cors = require("cors");

const app = express();

mongoose.set("strictQuery", true);

mongoose.connect(
  "mongodb+srv://ethnusmern:ethnusmern@cluster0.oowlki3.mongodb.net/mernproj"
);

const db = mongoose.connection;
db.on("open", () => {
  console.log("database connected");
});

db.on("error", (err) => {
  console.log("error in connecting to database", err);
});


app.use(cors());
app.use(express.json({limit: 52428800}));

app.use("/",eventRoute);

const port = 5000;
app.listen(port, () => {
  console.log("Server started on " + port);
});
