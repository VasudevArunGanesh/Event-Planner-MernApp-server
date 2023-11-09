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



app.use(express.json());
app.use(cors());
//app.use("/user", userRoute);
// app.use(express.json({limit: '50MB'}));
// app.use(express.urlencoded({limit: '50MB', extended: true, parameterLimit: 50000}));
app.use("/",eventRoute);
app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '10mb' }));

const port = 5000;
app.listen(port, () => {
  console.log("Server started on " + port);
});