import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import nodemailer from "nodemailer";
import twilio from "twilio";
import users from "../models/auth.js";

export const getAllUsers = async (req, res) => {
  try {
    const allUsers = await users.find();
    const allUserDetails = [];
    allUsers.forEach((user) => {
      allUserDetails.push({
        _id: user._id,
        name: user.name,
        about: user.about,
        tags: user.tags,
        joinedOn: user.joinedOn,
      });
    });
    return res.status(200).json(allUserDetails);
  } catch (error) {
    return res.status(404).json({ message: error.message });
  }
};

export const updateProfile = async (req, res) => {
  const { id: _id } = req.params;
  const { name, about, tags } = req.body;

  if (!mongoose.Types.ObjectId.isValid(_id)) {
    return res.status(404).send("user unavailable.");
  }

  try {
    const updatedProfile = await users.findByIdAndUpdate(
      _id,
      { $set: { name: name, about: about, tags: tags } },
      { new: true }
    );
    return res.status(200).json(updatedProfile);
  } catch (error) {
    return res.status(405).json({ message: error.message });
  }
};

export const sendEmail = async (req, res) => {
  const { email } = req.body;

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailRegex.test(email)) {
    return res.status(400).json({
      message: "Invalid email format",
    });
  }

  const user = await users.findOne({ email });

  if (!user) {
    return res.status(404).json({
      message: "User not found",
    });
  }

  try {
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    // const resetLink = `https://stack-overflow-two-xi.vercel.app/reset-password/${token}`;
    const resetLink = `http://localhost:3000/reset-password/${token}`;

    let transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "ssneh20062003@gmail.com",
        pass: "ojaqocrwwjkxjbzl",
      },
    });

    let mailOptions = {
      from: "StackOverflow Clone <ssneh20062003@gmail.com>",
      to: email,
      subject: "Reset your password",
      html: `<p>You requested a password reset. <a href="${resetLink}">Click here</a> to reset your password.</br>This link is only valid for 1 hour.</p>`,
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        return res.status(500).json({ message: "something went wrong", error });
      } else {
        return res.status(200).json({ message: "email sent successfully" });
      }
    });
  } catch (error) {
    return res.status(405).json({ message: error.message });
  }
};

export const sendEmailOTP = async (req, res) => {
  const { email, isLogin = false } = req.body;

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailRegex.test(email)) {
    return res.status(400).json({
      message: "Invalid email format",
    });
  }

  const user = await users.findOne({ email });

  if (!user) {
    return res.status(404).json({
      message: "User not found",
    });
  }

  try {
    const otp = Math.floor(1000 + Math.random() * 9000);
    otpStore[email] = {
      otp: otp,
      timestamp: Date.now(),
    };

    let transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "ssneh20062003@gmail.com",
        pass: "ojaqocrwwjkxjbzl",
      },
    });

    let mailOptions = {
      from: "StackOverflow Clone <ssneh20062003@gmail.com>",
      to: email,
      subject: isLogin ? "Login OTP" : "Change website language",
      html: `<p>Your otp is ${otp}. <br/>This otp is only valid for 5 minutes.</p>`,
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        return res.status(500).json({ message: "something went wrong", error });
      } else {
        return res.status(200).json({ message: "email sent successfully" });
      }
    });
  } catch (error) {
    return res.status(405).json({ message: error.message });
  }
};

let otpStore = {};

export const sendOTP = async (req, res) => {
  const { phone } = req.body;

  const phoneRegex = /^(?:\+91|91)?[789]\d{9}$/;

  if (!phoneRegex.test(phone)) {
    return res.status(400).json({
      message: "Invalid phone number format",
    });
  }

  const user = await users.findOne({ phoneNumber: phone });

  if (!user) {
    return res.status(404).send("User not found");
  }

  try {
    const accountSid = process.env.TWILIO_ACCOUNT_SID;
    const authToken = process.env.TWILIO_AUTH_TOKEN;
    const client = twilio(accountSid, authToken);

    const otp = Math.floor(1000 + Math.random() * 9000);
    otpStore[phone] = {
      otp: otp,
      timestamp: Date.now(),
    };

    await client.messages.create({
      body: `Phone verification OTP for stackoverflow clone is ${otp}`,
      from: "+14244002890",
      to: phone,
    });

    return res.status(200).json({ message: "OTP sent successfully" });
  } catch (error) {
    return res.status(405).json({ message: error.message });
  }
};

export const verifyOTP = async (req, res) => {
  const { phone, enteredOTP } = req.body;

  const user = await users.findOne({ phoneNumber: phone });

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  if (enteredOTP.length !== 4) {
    return res.status(400).json({ message: "Invalid OTP" });
  }

  try {
    if (otpStore[phone] && otpStore[phone].otp === parseInt(enteredOTP, 10)) {
      const otpValidityTime = 5 * 60 * 1000;

      if (Date.now() - otpStore[phone].timestamp <= otpValidityTime) {
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
          expiresIn: "5m",
        });
        res.status(200).json({ message: "OTP verified successfully", token });
        delete otpStore[phone];
      } else {
        res
          .status(400)
          .json({ message: "OTP expired. Please request a new OTP." });
      }
    } else {
      res.status(400).json({ message: "Invalid OTP" });
    }
  } catch (error) {
    return res.status(405).json({ message: error.message });
  }
};

export const verifyLangOTP = async (req, res) => {
  const { key, enteredOTP } = req.body;

  const user = await users.findOne({
    $or: [{ email: key }, { phoneNumber: key }],
  });

  if (!user) {
    return res.status(404).json({ message: "User not found", success: false });
  }

  if (enteredOTP.length !== 4) {
    return res.status(400).json({ message: "Invalid OTP", success: false });
  }

  try {
    if (otpStore[key] && otpStore[key].otp === parseInt(enteredOTP, 10)) {
      const otpValidityTime = 5 * 60 * 1000;

      if (Date.now() - otpStore[key].timestamp <= otpValidityTime) {
        res
          .status(200)
          .json({ message: "OTP verified successfully", success: true });
        delete otpStore[key];
      } else {
        res.status(400).json({
          message: "OTP expired. Please request a new OTP.",
          success: false,
        });
      }
    } else {
      res.status(400).json({ message: "Invalid OTP", success: false });
    }
  } catch (error) {
    return res.status(405).json({ message: error.message, success: false });
  }
};

export const resetPassword = async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (!decoded) {
      return res.status(401).json({ message: "invalid token" });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const updatedUser = await users.findByIdAndUpdate(
      decoded.id,
      { $set: { password: hashedPassword } },
      { new: true }
    );

    return res
      .status(200)
      .json({ message: "password updated successfully", updatedUser });
  } catch (error) {
    return res.status(405).json({ message: error.message });
  }
};
