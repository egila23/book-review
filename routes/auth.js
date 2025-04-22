import express from "express";
import { register, login } from "../controller/user.js"; // Fixed import (no "User")


const router = express.Router();
router.post("/register", register);
router.post("/login", login);

export default router;
