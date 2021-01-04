const mongoose = require("mongoose");
const participantsSchema = mongoose.Schema({
  pid: mongoose.Schema.Types.ObjectId,
  name: String,
  email: String,
  rsvp: String,
});
module.exports = mongoose.model("Participant", participantsSchema);
