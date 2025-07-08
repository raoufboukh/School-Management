import { Schedule } from "../models/schedule.model.ts";
import { SubjectPayment } from "../models/subject.models.ts";

export const createSchedule = async (req: any, res: any) => {
  try {
    const {
      studentIds,
      teacherId,
      subject,
      subjectPaymentIds,
      dayOfWeek,
      startTime,
      endTime,
      classroom,
      maxStudents = 10,
    } = req.body;

    const payments = await SubjectPayment.find({
      _id: { $in: subjectPaymentIds },
      teacherId,
      subject,
      isActive: true,
      sessionsRemaining: { $gt: 0 },
    });

    if (payments.length !== subjectPaymentIds.length) {
      return res.status(400).json({
        message: "Some students don't have valid payments for this subject",
      });
    }

    const existingSchedule = await Schedule.findOne({
      teacherId,
      dayOfWeek,
      startTime,
      endTime,
      classroom,
      isActive: true,
    });

    if (existingSchedule) {
      try {
        const updatedStudentIds = [
          ...new Set([...existingSchedule.studentIds, ...studentIds]),
        ];
        const updatedSubjectPaymentIds = [
          ...new Set([
            ...existingSchedule.subjectPaymentIds,
            ...subjectPaymentIds,
          ]),
        ];

        const updatedSchedule = await Schedule.findByIdAndUpdate(
          existingSchedule._id,
          {
            studentIds: updatedStudentIds,
            subjectPaymentIds: updatedSubjectPaymentIds,
          },
          { new: true }
        )
          .populate("studentIds", "name email")
          .populate("teacherId", "name email");

        return res.status(200).json({
          message: "Students added to existing schedule successfully",
          schedule: updatedSchedule,
        });
      } catch (error: any) {
        return res.status(400).json({ message: error.message });
      }
    }

    const schedule = new Schedule({
      studentIds,
      teacherId,
      subject,
      subjectPaymentIds,
      dayOfWeek,
      startTime,
      endTime,
      classroom,
      maxStudents,
    });

    await schedule.save();

    const populatedSchedule = await Schedule.findById(schedule._id)
      .populate("studentIds", "name email")
      .populate("teacherId", "name email");

    res.status(201).json({
      message: "Schedule created successfully",
      schedule: populatedSchedule,
    });
  } catch (error) {
    res.status(500).json({ message: "Error creating schedule", error });
  }
};

export const getStudentSchedule = async (req: any, res: any) => {
  try {
    const { studentId } = req.params;

    const schedules = await Schedule.find({
      studentIds: studentId,
      isActive: true,
    })
      .populate("teacherId", "name email")
      .populate("subjectPaymentIds", "sessionsRemaining totalSessionsPaid")
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
      isActive: true,
    })
      .populate("studentIds", "name email fields")
      .populate("subjectPaymentIds", "sessionsRemaining totalSessionsPaid")
      .sort({ dayOfWeek: 1, startTime: 1 });

    const schedulesWithInfo = schedules.map((schedule) => ({
      ...schedule.toObject(),
      studentCount: schedule.studentIds.length,
      availableSlots: schedule.maxStudents - schedule.studentIds.length,
    }));

    res.status(200).json({ teacherSchedules: schedulesWithInfo });
  } catch (error) {
    res.status(500).json({ message: "Error fetching teacher schedule", error });
  }
};

export const addStudentsToSchedule = async (req: any, res: any) => {
  try {
    const { scheduleId } = req.params;
    const { studentIds, subjectPaymentIds } = req.body;

    const schedule = await Schedule.findById(scheduleId);
    if (!schedule) {
      return res.status(404).json({ message: "Schedule not found" });
    }

    const updatedStudentIds = [
      ...new Set([...schedule.studentIds, ...studentIds]),
    ];
    const updatedSubjectPaymentIds = [
      ...new Set([...schedule.subjectPaymentIds, ...subjectPaymentIds]),
    ];

    const updatedSchedule = await Schedule.findByIdAndUpdate(
      scheduleId,
      {
        studentIds: updatedStudentIds,
        subjectPaymentIds: updatedSubjectPaymentIds,
      },
      { new: true }
    )
      .populate("studentIds", "name email")
      .populate("teacherId", "name email");

    res.status(200).json({
      message: "Students added successfully",
      schedule: updatedSchedule,
    });
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const removeStudentsFromSchedule = async (req: any, res: any) => {
  try {
    const { scheduleId } = req.params;
    const { studentIds } = req.body;

    const schedule = await Schedule.findById(scheduleId);
    if (!schedule) {
      return res.status(404).json({ message: "Schedule not found" });
    }

    const updatedStudentIds = schedule.studentIds.filter(
      (id) => !studentIds.includes(id.toString())
    );
    const updatedSubjectPaymentIds = schedule.subjectPaymentIds.filter(
      (id, index) => !studentIds.includes(schedule.studentIds[index].toString())
    );

    const updatedSchedule = await Schedule.findByIdAndUpdate(
      scheduleId,
      {
        studentIds: updatedStudentIds,
        subjectPaymentIds: updatedSubjectPaymentIds,
      },
      { new: true }
    )
      .populate("studentIds", "name email")
      .populate("teacherId", "name email");

    res.status(200).json({
      message: "Students removed successfully",
      schedule: updatedSchedule,
    });
  } catch (error: any) {
    res.status(400).json({ message: error.message });
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
