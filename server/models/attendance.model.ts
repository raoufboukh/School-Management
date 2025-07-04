import mongoose from "mongoose";

const attendanceSchema = new mongoose.Schema(
  {
    studentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    teacherId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    scheduleId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Schedule",
      required: true,
    },
    subjectPaymentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "SubjectPayment",
      required: true,
    },
    subject: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    status: {
      type: String,
      enum: ["present", "absent"],
      required: true,
    },
    checkInTime: {
      type: Date,
    },
    checkOutTime: {
      type: Date,
    },
    notes: {
      type: String,
      default: "",
    },
    sessionConsumed: {
      type: Boolean,
      default: false,
    },
    sessionNumber: {
      type: Number,
    },
  },
  { timestamps: true }
);

attendanceSchema.index(
  { studentId: 1, scheduleId: 1, date: 1 },
  { unique: true }
);

export const Attendance = mongoose.model("Attendance", attendanceSchema);
