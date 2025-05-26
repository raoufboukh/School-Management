import { SubjectPayment } from "../models/subject.models.ts";
import { User } from "../models/auth.model.ts";
import { Attendance } from "../models/attendance.model.js";
import { Schedule } from "../models/schedule.model.ts";
import bcrypt from "bcrypt";

export const addTeacher = async (req: any, res: any) => {
  try {
    const { username, email, password, subject } = req.body;
    if (!username || !email || !password || !subject) {
      return res
        .status(400)
        .json({
          message: !username
            ? "Username is required"
            : !email
            ? "Email is required"
            : !password
            ? "Password is required"
            : "Subject is required",
        });
    }
    const existingTeacher = await User.findOne({ email });
    if (existingTeacher)
      return res
        .status(400)
        .json({ message: "Teacher with this email already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const newTeacher = new User({
      username,
      email,
      password: hashedPassword,
      role: "teacher",
      subject,
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
    const { studentId, scheduleId, status, notes } = req.body;
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

    if (status === "present" || status === "late") {
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
      checkInTime:
        status === "present" || status === "late" ? new Date() : undefined,
      notes,
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
    const { studentId, teacherId, subject } = req.query;

    const subjectPayment = await SubjectPayment.findOne({
      studentId,
      teacherId,
      subject,
    }).populate("teacherId", "username email");

    if (!subjectPayment) {
      return res
        .status(404)
        .json({ message: "No payment found for this subject" });
    }

    const attendanceHistory = await Attendance.find({
      studentId,
      teacherId,
      subject,
      subjectPaymentId: subjectPayment._id,
    })
      .populate("scheduleId", "dayOfWeek startTime endTime classroom")
      .sort({ date: -1 });

    const stats = {
      totalSessionsPaid: subjectPayment.totalSessionsPaid,
      sessionsRemaining: subjectPayment.sessionsRemaining,
      sessionsAttended: subjectPayment.sessionsAttended,
      sessionsAbsent: subjectPayment.sessionsAbsent,
      attendanceRate:
        subjectPayment.sessionsAttended > 0
          ? (
              (subjectPayment.sessionsAttended /
                (subjectPayment.sessionsAttended +
                  subjectPayment.sessionsAbsent)) *
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
    res.status(500).json({ message: "Error fetching session history", error });
  }
};

export const getStudentReport = async (req: any, res: any) => {
  try {
    const { studentId } = req.params;

    const subjectPayments = await SubjectPayment.find({ studentId }).populate(
      "teacherId",
      "username email"
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
