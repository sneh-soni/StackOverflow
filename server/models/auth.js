import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  password: { type: String, required: true },
  about: { type: String },
  tags: { type: [String] },
  joinedOn: { type: Date, default: Date.now },
  loginHistory: {
    type: [
      {
        time: { type: Date, default: Date.now },
        ip: { type: String, required: true },
        os: { type: String },
        browser: { type: String },
        device: {
          type: String,
          enum: ["desktop", "mobile"],
          required: true,
        },
      },
    ],
    default: [],
  },
});

export default mongoose.model("User", userSchema);
