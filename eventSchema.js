const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;

const eventSchema = new mongoose.Schema(
  {
    //_id: ObjectId,
    eventName: String,
    isPrivate: Boolean,
    eventDescription: String,
    eventType: String,
    eventTheme: String,
    startDate: Date,
    endDate: Date,
    venueName: String,
    venueAddress: String,
    organizerContact: String,
    ticketPrice: Number,
    expectedAttendees: Number,
    useOtherServies: String,
    eventStatus: Number,
    eventPoster: String,
    userId: ObjectId
/*     venue: {
      venueName: String,
      venueAddress: String
    },
    organizerContact: {
      organizerContact: String
    },
    tickets: [
      {
        ticketPrice: Number
      }
    ],
    expectedAttendees: Number,

    useServices: [{
      // hosting: Boolean,
      // parking: Boolean,
      // catering: Boolean,
      // photography: Boolean
      useOtherServies: Boolean
    ]}
  }
   */
}
);
module.exports = mongoose.model('events', eventSchema);