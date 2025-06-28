import express from "express";
import {
  processSubjectPayment,
  getStudentPayments,
  getPaymentHistory,
  markAttendance,
  getSubjectSessionHistory,
  getStudentReport,
  addTeacher,
  getStudents,
  getStudent,
  addStudent,
  getTeachers,
  getTeacher,
  getTeacherStudents,
} from "../controllers/school.controllers.js";

const schoolRoutes = express.Router();

schoolRoutes.get("/students", getStudents);
schoolRoutes.get("/students/:studentId", getStudent);
schoolRoutes.post("/add-student", addStudent);

schoolRoutes.get("/teachers", getTeachers);
schoolRoutes.get("/teachers/:teacherId", getTeacher);
schoolRoutes.post("/add-teacher", addTeacher);

schoolRoutes.post("/payment", processSubjectPayment);
schoolRoutes.get("/payments/student/:studentId", getStudentPayments);
schoolRoutes.get("/payments/history", getPaymentHistory);

schoolRoutes.post("/attendance", markAttendance);
schoolRoutes.get("/attendance/history", getSubjectSessionHistory);

schoolRoutes.get("/report/student/:studentId", getStudentReport);
schoolRoutes.get("/teachers/:teacherId/students", getTeacherStudents);

export default schoolRoutes;
