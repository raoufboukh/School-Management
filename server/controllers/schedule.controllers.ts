import { Schedule } from "../models/schedule.model.ts";
import { SubjectPayment } from "../models/subject.models.ts";
import { User } from "../models/auth.model.ts";

export const createSchedule = async (req: any, res: any) => {
  try {
    const {
      studentId,
      teacherId,
      subject,
      subjectPaymentId,
      dayOfWeek,
      startTime,
      endTime,
      classroom,
    } = req.body;

    const student = await User.findById(studentId);
    if (!student || student.role !== "student") {
      return res.status(404).json({ message: "Student not found" });
    }

    const teacher = await User.findById(teacherId);
    if (!teacher || teacher.role !== "teacher") {
      return res.status(404).json({ message: "Teacher not found" });
    }

    const subjectPayment = await SubjectPayment.findById(subjectPaymentId);
    if (
      !subjectPayment ||
      !subjectPayment.isActive ||
      subjectPayment.sessionsRemaining <= 0
    ) {
      return res
        .status(400)
        .json({ message: "Valid payment required for this subject" });
    }

    const schedule = new Schedule({
      studentId,
      teacherId,
      subject,
      subjectPaymentId,
      dayOfWeek,
      startTime,
      endTime,
      classroom,
    });

    await schedule.save();

    res.status(201).json({
      message: "Schedule created successfully",
      schedule,
    });
  } catch (error) {
    res.status(500).json({ message: "Error creating schedule", error });
  }
};

export const getStudentSchedule = async (req: any, res: any) => {
  try {
    const { studentId } = req.params;

    const schedules = await Schedule.find({ studentId, isActive: true })
      .populate("teacherId", "username email")
      .populate("subjectPaymentId", "sessionsRemaining totalSessionsPaid")
      .sort({ dayOfWeek: 1, startTime: 1 });

    res.status(200).json({ schedules });
  } catch (error) {
    res.status(500).json({ message: "Error fetching student schedule", error });
  }
};

export const getTeacherSchedule = async (req: any, res: any) => {
  try {
    const { teacherId } = req.params;

    const schedules = await Schedule.find({
      teacherId,
    }).populate("studentId", "name");

    const scheduleData = schedules.map((schedule) => ({
      _id: schedule._id,
      subject: schedule.subject,
      dayOfWeek: schedule.dayOfWeek,
      startTime: schedule.startTime,
      endTime: schedule.endTime,
      classroom: schedule.classroom,
      studentName: schedule.studentId.name,
    }));

    res.status(200).json({ teacherSchedules: scheduleData });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching teacher schedules", error });
  }
};

export const getAllSchedules = async (req: any, res: any) => {
  try {
    const { day, subject, classroom } = req.query;

    const filter: any = { isActive: true };
    if (day) filter.dayOfWeek = day;
    if (subject) filter.subject = subject;
    if (classroom) filter.classroom = classroom;

    const schedules = await Schedule.find(filter)
      .populate("studentId", "username email")
      .populate("teacherId", "username email")
      .populate("subjectPaymentId", "sessionsRemaining totalSessionsPaid")
      .sort({ dayOfWeek: 1, startTime: 1 });

    res.status(200).json({ schedules });
  } catch (error) {
    res.status(500).json({ message: "Error fetching schedules", error });
  }
};

export const updateSchedule = async (req: any, res: any) => {
  try {
    const { scheduleId } = req.params;
    const updates = req.body;

    const schedule = await Schedule.findByIdAndUpdate(scheduleId, updates, {
      new: true,
    })
      .populate("teacherId", "username email")
      .populate("studentId", "username email");

    if (!schedule) {
      return res.status(404).json({ message: "Schedule not found" });
    }

    res.status(200).json({
      message: "Schedule updated successfully",
      schedule,
    });
  } catch (error) {
    res.status(500).json({ message: "Error updating schedule", error });
  }
};

export const deleteSchedule = async (req: any, res: any) => {
  try {
    const { scheduleId } = req.params;

    const schedule = await Schedule.findByIdAndUpdate(
      scheduleId,
      { isActive: false },
      { new: true }
    );

    if (!schedule) {
      return res.status(404).json({ message: "Schedule not found" });
    }

    res.status(200).json({
      message: "Schedule deleted successfully",
    });
  } catch (error) {
    res.status(500).json({ message: "Error deleting schedule", error });
  }
};
