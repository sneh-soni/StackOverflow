import express from "express";
import { login, signup } from "../controllers/auth.js";
import {
  getAllUsers,
  updateProfile,
  sendEmail,
  sendOTP,
  sendEmailOTP,
  verifyOTP,
  resetPassword,
  verifyLangOTP,
} from "../controllers/users.js";
import auth from "../middleware/auth.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/send-email", sendEmail);
router.post("/send-otp", sendOTP);
router.post("/send-email-otp", sendEmailOTP);
router.post("/verify-otp", verifyOTP);
router.post("/verify-language-otp", verifyLangOTP);
router.post("/reset-password/:token", resetPassword);

router.get("/getAllUsers", getAllUsers);
router.patch("/update/:id", auth, updateProfile);

export default router;
