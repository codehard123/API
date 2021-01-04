const mongoose = require("mongoose");
const meetingSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  participants: Array,
  startTime: String,
  endTime: String,
  creationTime: String,
});
module.exports = mongoose.model("Meeting", meetingSchema);
