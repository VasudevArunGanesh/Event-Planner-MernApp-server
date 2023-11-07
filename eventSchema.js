const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;

const eventSchema = new mongoose.Schema(
  {
    _id: ObjectId,
    eventName: String,
    isPublic: Boolean,
    eventDescription: String,
    eventType: String,
    eventTheme: String,
    startDate: Date,
    endDate: Date,
    venue: {
      venueName: String,
      venueAddress: String
    },
    organizerContact: {
      organizerName: String,
      organizerEmail: String,
      organizerPhone: String
    },
    tickets: [
      {
        ticketType: String,
        price: Number
      }
    ],
    expectedAttendees: Number,
    registrationForm: [
      {
        //what to write heregit n
      }
    ],
    useServices: {
      nearbyHotels: Boolean,
      cabService: Boolean
    }
  }
  
);
module.exports = mongoose.model('events', eventSchema);
// const mongoose = require("mongoose");

