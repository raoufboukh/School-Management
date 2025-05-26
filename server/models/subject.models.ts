import mongoose from "mongoose";

const subjectPaymentSchema = new mongoose.Schema(
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
    subject: {
      type: String,
      required: true,
    },
    totalSessionsPaid: {
      type: Number,
      required: true,
      default: 4,
    },
    sessionsRemaining: {
      type: Number,
      required: true,
      default: 4,
    },
    sessionsAttended: {
      type: Number,
      default: 0,
    },
    sessionsAbsent: {
      type: Number,
      default: 0,
    },
    paymentDate: {
      type: Date,
      required: true,
      default: Date.now,
    },
    amount: {
      type: Number,
      required: true,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    expiryDate: {
      type: Date,
      default: () => new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
    },
  },
  { timestamps: true }
);

subjectPaymentSchema.index({ studentId: 1, teacherId: 1, subject: 1 });

export const SubjectPayment = mongoose.model(
  "SubjectPayment",
  subjectPaymentSchema
);
