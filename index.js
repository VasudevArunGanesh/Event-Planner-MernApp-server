const mongoose = require("mongoose");
const express = require("express");
const eventRoute = require("./eventRoutes");

const cors = require("cors");

const app = express();
mongoose.set("strictQuery", true);

mongoose.connect(
 //"mongodb+srv://richier:richier@cluster0.98bwwd5.mongodb.net/School"
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
app.use("/events", eventRoute);

const port = 5500;
app.listen(port, () => {
  console.log("Server started on " + port);
});
