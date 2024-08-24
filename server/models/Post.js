const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  content: { type: String, required: true },
  division: { type: String, required: true },
  zilla: { type: String, required: true },
  contactname: { type: String, required: true },
  //address: { type: String, required: true },
  phonenumber: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Post", postSchema);
