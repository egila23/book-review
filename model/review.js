import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema({
  rating: {
    type: Number,
    min: 1,
    max: 5,
    required: true
  },
  comment: {
    type: String,
    maxlength: 500,
    required: false
  },
  bookReference: {
    type: mongoose.Schema.Types.ObjectId,  
    required: true,
    ref: "Book" 
  },
  userReference: {
    type: mongoose.Schema.Types.ObjectId, 
    required: true,
    ref: "User" 
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});


reviewSchema.index(
  { bookReference: 1, userReference: 1 }, 
  { unique: true }
);

const Review = mongoose.model("Review", reviewSchema);
export default Review;