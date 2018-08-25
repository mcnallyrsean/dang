const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const reviewSchema = new mongoose.Schema({
  created: {
    type: Date,
    default: Date.now
  },
  author: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: "you must supply an author"
  },
  store: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: "you must supply an store"
  },
  text: {
    type: String,
    required: "You must have text"
  },
  rating: {
    type: Number,
    min: 1,
    max: 5
  }
});

function autopopulate(next) {
  this.populate("author");
  next();
}

reviewSchema.pre("find", autopopulate);
reviewSchema.pre("findOne", autopopulate);

module.exports = mongoose.model("Review", reviewSchema);
