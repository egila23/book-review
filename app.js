import express from "express";
import dotenv from "dotenv";
dotenv.config();
import mongoose from "mongoose";
import router from "./routes/auth.js";
import bookRouter from "./routes/book.js";
import reviewrouter from "./routes/review.js"
const app = express();

app.use(express.json()); 
app.use(bookRouter);
app.use(reviewrouter);
const PORT = process.env.PORT || 5000;
const connectDB = async () => {
  try {
    mongoose.set("strictQuery", false);
    const connection = await mongoose.connect(process.env.MONGODB_URI);
    console.log(`Database Connected On Port ${PORT}`);
  } catch (error) {
    console.log(error);
  }
};

app.use(router);

connectDB();
app.listen(PORT, () => {
  console.log(`App is listening on PORT ${PORT}`);
});

export default app;
