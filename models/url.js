const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    shortId: {
      // it is short id provided by the user and not by the database connection
      type: String,
      required: true,
      unique: true,
    },
    redirectUrl: {
      type: String,
      required: true,
    },
    visitHistory: [{ type: Date }],
  },
  { timestamps: true },
);

const URL = mongoose.model('url', userSchema);
module.exports = URL;

