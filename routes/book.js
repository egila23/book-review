import express from "express";
import {
  getbook,
  updatebook,
  Deletedbook,
  createbook,
} from "../controller/book.js";

import { authenticateUser } from "../middleware/auth.js";
const router = express.Router();

router.get("/", getbook); //
router.post("/", authenticateUser, createbook);
router.put("/update/:id", authenticateUser, updatebook);
router.delete("/delete/:id", authenticateUser, Deletedbook);

export default router;
