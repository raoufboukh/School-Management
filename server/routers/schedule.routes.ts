import express from "express";
import {
  createSchedule,
  deleteSchedule,
  getAllSchedules,
  getStudentSchedule,
  getTeacherSchedule,
  updateSchedule,
} from "../controllers/schedule.controllers.ts";

const scheduleRoutes = express.Router();

// Schedule CRUD Routes
scheduleRoutes.post("/", createSchedule);
scheduleRoutes.get("/student/:studentId", getStudentSchedule);
scheduleRoutes.get("/teacher/:teacherId", getTeacherSchedule);
scheduleRoutes.get("/all", getAllSchedules);
scheduleRoutes.put("/:scheduleId", updateSchedule);
scheduleRoutes.delete("/:scheduleId", deleteSchedule);

export default scheduleRoutes;
