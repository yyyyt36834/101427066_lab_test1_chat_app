const mongoose = require('mongoose');

const GroupMessageSchema = new mongoose.Schema({
  from_user: {
    type: String
  },
  room: {
    type: String
  },
  message: {
    type: Date
  },
  date_sent:
  {
    type:date
  }
});

const GroupMessage = mongoose.model("GroupMessage", GroupMessageSchema);
module.exports = GroupMessage;