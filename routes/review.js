import express from "express";
import  { getBookReview, reviewSubmit } from "../controller/review.js";

const router = express.Router();

router.post("/reviews", reviewSubmit);
router.get("/review/:bookId", getBookReview);


export default router;
