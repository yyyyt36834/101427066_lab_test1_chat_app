const mongoose = require('mongoose');

const PrivateMessageSchema = new mongoose.Schema({
  from_user: {
    type: String
  },
  to_user: {
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

const PrivateMessage = mongoose.model("PrivateMessage", PrivateMessageSchema);
module.exports = PrivateMessage;