import express from "express";
import {
  addStudentsToSchedule,
  createSchedule,
  deleteSchedule,
  getAllSchedules,
  getStudentSchedule,
  getTeacherSchedule,
  removeStudentsFromSchedule,
  updateSchedule,
} from "../controllers/schedule.controllers.ts";

const scheduleRoutes = express.Router();

scheduleRoutes.post("/", createSchedule);
scheduleRoutes.get("/student/:studentId", getStudentSchedule);
scheduleRoutes.get("/teacher/:teacherId", getTeacherSchedule);
scheduleRoutes.get("/all", getAllSchedules);
scheduleRoutes.put("/:scheduleId", updateSchedule);
scheduleRoutes.put("/:scheduleId/add-students", addStudentsToSchedule);
scheduleRoutes.put("/:scheduleId/remove-students", removeStudentsFromSchedule);
scheduleRoutes.delete("/:scheduleId", deleteSchedule);

export default scheduleRoutes;
