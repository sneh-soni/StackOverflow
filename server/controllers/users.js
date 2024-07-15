import mongoose from "mongoose";
import users from "../models/auth.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import nodemailer from "nodemailer";

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
