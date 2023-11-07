const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;

const userSchema = new mongoose.Schema(
    {
    _id: ObjectId,
    newame: String,
    email: String,
    password: String
    }
)

module.exports = mongoose.model("mernproj", userSchema);