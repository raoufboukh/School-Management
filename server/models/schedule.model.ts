import mongoose from "mongoose";

const scheduleSchema = new mongoose.Schema(
  {
    studentIds: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "User",
      required: true,
      validate: {
        validator: function (v: any[]) {
          return v && v.length > 0;
        },
        message: "At least one student must be assigned to the schedule",
      },
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
    subjectPaymentIds: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "SubjectPayment",
      required: true,
      validate: {
        validator: function (v: any[]) {
          return v && v.length > 0;
        },
        message: "At least one subject payment must be linked to the schedule",
      },
    },
    dayOfWeek: {
      type: String,
      enum: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
      ],
      required: true,
    },
    startTime: {
      type: String,
      required: true,
    },
    endTime: {
      type: String,
      required: true,
    },
    classroom: {
      type: String,
      required: true,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

scheduleSchema.index({ teacherId: 1, dayOfWeek: 1, startTime: 1 });
scheduleSchema.index({ studentIds: 1 });

scheduleSchema.methods.addStudents = function (
  studentIds: string[],
  subjectPaymentIds: string[]
) {
  const newStudentIds = studentIds.filter(
    (id) => !this.studentIds.includes(id)
  );
  const newPaymentIds = subjectPaymentIds.filter(
    (id) => !this.subjectPaymentIds.includes(id)
  );

  if (this.studentIds.length + newStudentIds.length > this.maxStudents) {
    throw new Error(
      `Cannot add students. Maximum capacity (${this.maxStudents}) would be exceeded.`
    );
  }

  this.studentIds.push(...newStudentIds);
  this.subjectPaymentIds.push(...newPaymentIds);
  return this.save();
};

scheduleSchema.methods.removeStudents = function (studentIds: string[]) {
  this.studentIds = this.studentIds.filter(
    (id: any) => !studentIds.includes(id.toString())
  );

  if (this.studentIds.length === 0) {
    this.isActive = false;
  }

  return this.save();
};

export const Schedule = mongoose.model("Schedule", scheduleSchema);
