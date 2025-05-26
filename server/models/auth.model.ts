import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: function () {
        return !(this as any).googleId;
      },
    },
    number: {
      type: String,
    },
    googleId: {
      type: String,
    },
    profilePicture: {
      type: String,
      default: "",
    },
    notifications: {
      type: String,
      default: "",
    },
    subjects: {
      type: [String],
      default: [],
    },
    subject: {
      type: String,
    },
    fields: {
      type: String,
      enum: ["PRIMARY", "CEM", "LICEE"],
    },
    role: {
      type: String,
      enum: ["student", "admin", "teacher"],
      default: "student",
    },
  },
  { timestamps: true }
);

export const User = mongoose.model("User", userSchema);
