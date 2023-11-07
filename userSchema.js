const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;

const userSchema = new mongoose.Schema(
    {
    name: String,
    email: String,
    password: String
    }
)

module.exports = mongoose.model('user', userSchema);