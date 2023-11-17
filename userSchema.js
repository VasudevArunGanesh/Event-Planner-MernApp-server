const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;

const userSchema = new mongoose.Schema(
    {
    name: String,
    email: String,
    password: String,
    location: String,
    pfp: String,
    registeredEvents: [{
        eventName: String,
        startDate: Date,
        endDate: Date,
    }]
    }
)

module.exports = mongoose.model('user', userSchema);