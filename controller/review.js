import Review from "../model/review.js";

export const reviewSubmit = async (req, res) => {
  try {
    const { rating, comment, bookReference, userReference } = req.body;

    if (!rating || !bookReference || !userReference) {
      return res
        .status(400)
        .json({ error: "Rating, book and user references are required" });
    }

    const existingReview = await Review.findOne({
      bookReference,
      userReference,
    });

    if (existingReview) {
      return res
        .status(400)
        .json({ error: "You've already reviewed this book" });
    }

    const newReview = await Review.create({
      rating,
      comment: comment || "",
      bookReference,
      userReference,
    });

    res.status(201).json({
      message: "Review submitted successfully",
      review: newReview,
    });
  } catch (error) {
    console.error("Review submission error:", error);

    if (error.name === "ValidationError") {
      return res.status(400).json({ error: error.message });
    }

    if (error.code === 11000) {
      return res.status(400).json({ error: "Duplicate review detected" });
    }

    res.status(500).json({ error: "Internal server error" });
  }
};

export const getBookReview = async (req, res) => {
  try {
    const reviews = await Review.find({ bookReference: req.params.bookId })
      .populate("userReference", "username")
      .sort({ createdAt: -1 });

    if (!reviews.length) {
      return res
        .status(404)
        .json({ message: "No reviews found for this book" });
    }

    res.status(200).json(reviews);
  } catch (error) {
    console.error("Get reviews error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
