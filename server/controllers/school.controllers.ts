import { SubjectPayment } from "../models/subject.models.ts";
import { User } from "../models/auth.model.ts";
import { Attendance } from "../models/attendance.model.js";
import { Schedule } from "../models/schedule.model.ts";
import bcrypt from "bcrypt";
import mongoose from "mongoose";

export const getStudents = async (req: any, res: any) => {
  try {
    const students = await User.find({ role: "student" }).select("-password");
    res.status(200).json({ students });
  } catch (error) {
    res.status(500).json({ message: "Error fetching students", error });
  }
};

export const getStudent = async (req: any, res: any) => {
  try {
    const { studentId } = req.params;
    const student = await User.findById(studentId).select("-password");
    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }
    res.status(200).json({ student });
  } catch (error) {
    res.status(500).json({ message: "Error fetching student", error });
  }
};

export const addStudent = async (req: any, res: any) => {
  try {
    const { name, email, password, fields, number } = req.body;
    if (!name || !email || !password || !fields || !number) {
      return res.status(400).json({
        message: !name
          ? "Name is required"
          : !email
          ? "Email is required"
          : !password
          ? "Password is required"
          : !fields
          ? "Fields is required"
          : "Number is required",
      });
    }
    const existingStudent = await User.findOne({ email });
    if (existingStudent)
      return res
        .status(400)
        .json({ message: "Student with this email already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const newStudent = new User({
      name,
      email,
      password: hashedPassword,
      fields,
      number,
    });
    await newStudent.save();
    res
      .status(201)
      .json({ message: "Student added successfully", student: newStudent });
  } catch (error) {
    res.status(500).json({ message: "Error adding student", error });
  }
};

export const getTeachers = async (req: any, res: any) => {
  try {
    const teachers = await User.find({ role: "teacher" }).select("-password");
    res.status(200).json({ teachers });
  } catch (error) {
    res.status(500).json({ message: "Error fetching teachers", error });
  }
};

export const getTeacher = async (req: any, res: any) => {
  try {
    const { teacherId } = req.params;
    const teacher = await User.findById(teacherId).select("-password");
    if (!teacher) {
      return res.status(404).json({ message: "Teacher not found" });
    }
    res.status(200).json({ teacher });
  } catch (error) {
    res.status(500).json({ message: "Error fetching teacher", error });
  }
};

export const addTeacher = async (req: any, res: any) => {
  try {
    const { name, email, password, subject, number } = req.body;
    if (!name || !email || !password || !subject || !number) {
      return res.status(400).json({
        message: !name
          ? "Name is required"
          : !email
          ? "Email is required"
          : !password
          ? "Password is required"
          : !subject
          ? "Subject is required"
          : "Number is required",
      });
    }
    const existingTeacher = await User.findOne({ email });
    if (existingTeacher)
      return res
        .status(400)
        .json({ message: "Teacher with this email already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const newTeacher = new User({
      name,
      email,
      password: hashedPassword,
      role: "teacher",
      subjects: [subject],
      number,
    });
    await newTeacher.save();
    res
      .status(201)
      .json({ message: "Teacher added successfully", teacher: newTeacher });
  } catch (error) {
    res.status(500).json({ message: "Error adding teacher", error });
  }
};

export const processSubjectPayment = async (req: any, res: any) => {
  try {
    const {
      studentId,
      teacherId,
      subject,
      amount,
      sessionCount = 4,
    } = req.body;

    const student = await User.findById(studentId);
    const teacher = await User.findById(teacherId);

    if (!student || student.role !== "student") {
      return res.status(404).json({ message: "Student not found" });
    }

    if (!teacher || teacher.role !== "teacher") {
      return res.status(404).json({ message: "Teacher not found" });
    }

    const existingPayment = await SubjectPayment.findOne({
      studentId,
      teacherId,
      subject,
      isActive: true,
      sessionsRemaining: { $gt: 0 },
    });

    if (existingPayment) {
      return res.status(400).json({
        message:
          "Active payment already exists for this subject with this teacher",
        existingPayment,
      });
    }

    const subjectPayment = new SubjectPayment({
      studentId,
      teacherId,
      subject,
      totalSessionsPaid: sessionCount,
      sessionsRemaining: sessionCount,
      amount,
    });

    await subjectPayment.save();

    res.status(201).json({
      message: "Subject payment processed successfully",
      subjectPayment,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error processing subject payment", error });
  }
};

export const getStudentPayments = async (req: any, res: any) => {
  try {
    const { studentId } = req.params;

    const payments = await SubjectPayment.find({ studentId })
      .populate("teacherId", "username email")
      .sort({ createdAt: -1 });

    res.status(200).json({ payments });
  } catch (error) {
    res.status(500).json({ message: "Error fetching student payments", error });
  }
};

export const getPaymentHistory = async (req: any, res: any) => {
  try {
    const { studentId, teacherId, subject } = req.query;

    const filter: any = {};
    if (studentId) filter.studentId = studentId;
    if (teacherId) filter.teacherId = teacherId;
    if (subject) filter.subject = subject;

    const payments = await SubjectPayment.find(filter)
      .populate("studentId", "username email")
      .populate("teacherId", "username email")
      .sort({ createdAt: -1 });

    res.status(200).json({ payments });
  } catch (error) {
    res.status(500).json({ message: "Error fetching payment history", error });
  }
};

export const markAttendance = async (req: any, res: any) => {
  try {
    const { studentId, scheduleId, status } = req.body;
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const schedule = await Schedule.findById(scheduleId).populate(
      "subjectPaymentId"
    );
    if (!schedule) {
      return res.status(404).json({ message: "Schedule not found" });
    }

    const existingAttendance = await Attendance.findOne({
      studentId,
      scheduleId,
      date: {
        $gte: today,
        $lt: new Date(today.getTime() + 24 * 60 * 60 * 1000),
      },
    });

    if (existingAttendance) {
      return res
        .status(400)
        .json({ message: "Attendance already marked for today" });
    }

    const subjectPayment = await SubjectPayment.findById(
      schedule.subjectPaymentId
    );
    if (!subjectPayment) {
      return res
        .status(404)
        .json({ message: "No payment found for this subject" });
    }

    if (subjectPayment.sessionsRemaining <= 0) {
      return res
        .status(400)
        .json({ message: "No sessions remaining. Please make a payment." });
    }

    let sessionConsumed = false;
    let sessionNumber = 0;

    if (status === "present") {
      subjectPayment.sessionsRemaining -= 1;
      subjectPayment.sessionsAttended += 1;
      sessionConsumed = true;
      sessionNumber =
        subjectPayment.totalSessionsPaid - subjectPayment.sessionsRemaining;
      await subjectPayment.save();
    } else if (status === "absent") {
      subjectPayment.sessionsRemaining -= 1;
      subjectPayment.sessionsAbsent += 1;
      sessionConsumed = true;
      sessionNumber =
        subjectPayment.totalSessionsPaid - subjectPayment.sessionsRemaining;
      await subjectPayment.save();
    }

    const attendance = new Attendance({
      studentId,
      teacherId: schedule.teacherId,
      scheduleId,
      subjectPaymentId: schedule.subjectPaymentId,
      subject: schedule.subject,
      date: new Date(),
      status,
      checkInTime: status === "present" ? new Date() : undefined,
      sessionConsumed,
      sessionNumber,
    });

    await attendance.save();

    res.status(201).json({
      message: "Attendance marked successfully",
      attendance,
      sessionsRemaining: subjectPayment.sessionsRemaining,
      totalAttended: subjectPayment.sessionsAttended,
      totalAbsent: subjectPayment.sessionsAbsent,
    });
  } catch (error) {
    res.status(500).json({ message: "Error marking attendance", error });
  }
};

export const getSubjectSessionHistory = async (req: any, res: any) => {
  try {
    let { studentId, teacherId, subject } = req.query;

    if (!studentId || !teacherId || !subject) {
      return res.status(400).json({
        message: "studentId, teacherId, and subject are required",
      });
    }

    studentId = studentId.trim();
    teacherId = teacherId.trim();
    subject = subject.trim();

    if (
      !mongoose.Types.ObjectId.isValid(studentId) ||
      !mongoose.Types.ObjectId.isValid(teacherId)
    ) {
      return res.status(400).json({
        message: "Invalid studentId or teacherId format",
      });
    }

    console.log("Looking up payment with:", { studentId, teacherId, subject });

    const subjectPayment = await SubjectPayment.findOne({
      studentId: new mongoose.Types.ObjectId(studentId),
      teacherId: new mongoose.Types.ObjectId(teacherId),
      subject,
    }).populate("teacherId", "name email");

    if (!subjectPayment) {
      return res
        .status(404)
        .json({ message: "No payment found for this subject" });
    }

    const attendanceHistory = await Attendance.find({
      studentId: new mongoose.Types.ObjectId(studentId),
      teacherId: new mongoose.Types.ObjectId(teacherId),
      subject,
      subjectPaymentId: subjectPayment._id,
    })
      .populate("scheduleId", "dayOfWeek startTime endTime classroom")
      .sort({ date: -1 });

    const totalSessionsUsed =
      subjectPayment.sessionsAttended + subjectPayment.sessionsAbsent;

    const stats = {
      totalSessionsPaid: subjectPayment.totalSessionsPaid,
      sessionsRemaining: subjectPayment.sessionsRemaining,
      sessionsAttended: subjectPayment.sessionsAttended,
      sessionsAbsent: subjectPayment.sessionsAbsent,
      totalSessionsUsed,
      attendanceRate:
        totalSessionsUsed > 0
          ? (
              (subjectPayment.sessionsAttended / totalSessionsUsed) *
              100
            ).toFixed(2)
          : 0,
    };

    res.status(200).json({
      subjectPayment,
      attendanceHistory,
      stats,
    });
  } catch (error) {
    console.error("Error fetching session history:", error);
    res.status(500).json({
      message: "Error fetching session history",
      error: error instanceof Error ? error.message : String(error),
    });
  }
};

export const getStudentReport = async (req: any, res: any) => {
  try {
    const { studentId } = req.params;

    const subjectPayments = await SubjectPayment.find({ studentId }).populate(
      "teacherId",
      "name email"
    );

    const report = [];

    for (const payment of subjectPayments) {
      const attendanceCount = await Attendance.countDocuments({
        studentId,
        subjectPaymentId: payment._id,
      });

      const presentCount = await Attendance.countDocuments({
        studentId,
        subjectPaymentId: payment._id,
        status: { $in: ["present", "late"] },
      });

      const absentCount = await Attendance.countDocuments({
        studentId,
        subjectPaymentId: payment._id,
        status: "absent",
      });

      report.push({
        subject: payment.subject,
        teacher: payment.teacherId,
        totalSessionsPaid: payment.totalSessionsPaid,
        sessionsRemaining: payment.sessionsRemaining,
        sessionsAttended: presentCount,
        sessionsAbsent: absentCount,
        attendanceRate:
          presentCount > 0
            ? ((presentCount / (presentCount + absentCount)) * 100).toFixed(2)
            : 0,
        paymentDate: payment.paymentDate,
        amount: payment.amount,
        isActive: payment.isActive,
      });
    }

    res.status(200).json({ studentReport: report });
  } catch (error) {
    res.status(500).json({ message: "Error generating student report", error });
  }
};

export const getTeacherStudents = async (req: any, res: any) => {
  try {
    const { teacherId } = req.params;
    const subjectPayment = await SubjectPayment.find({
      teacherId,
    }).populate("studentId", "name email fields");
    const studentData = <any>[];
    for (const payment of subjectPayment) {
      const student = payment.studentId as any;
      const attendanceRecords = await Attendance.find({
        studentId: student._id,
        teacherId,
        subjectPayment: payment._id,
      });
      const presentCount = attendanceRecords.filter(
        (record) => record.status === "present"
      ).length;
      const attendanceRate =
        payment.sessionsAttended > 0
          ? Math.round((presentCount / payment.sessionsAttended) * 100)
          : 0;
      const lastAttendance = await Attendance.findOne({
        studentId: student._id,
        teacherId,
        subjectPaymentId: payment._id,
      }).sort({ date: -1 });
      studentData.push({
        _id: student._id,
        name: student.name,
        email: student.email,
        fields: student.fields,
        subject: payment.subject,
        isActive: student.isActive,
        attendanceRate,
        lastAttendance: lastAttendance ? lastAttendance.date : null,
        totalSessions: payment.totalSessionsPaid,
        attendedSessions: payment.sessionsAttended,
      });
    }

    res.status(200).json({ students: studentData });
  } catch (error: any) {
    res.status(500).json({ message: error.message || "Error Get Students" });
  }
};
