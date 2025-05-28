import express from "express";
import {
  processSubjectPayment,
  getStudentPayments,
  getPaymentHistory,
  markAttendance,
  getSubjectSessionHistory,
  getStudentReport,
  addTeacher,
} from "../controllers/school.controllers.js";

const schoolRoutes = express.Router();

schoolRoutes.post("/add-teacher", addTeacher);

schoolRoutes.post("/payment", processSubjectPayment);
schoolRoutes.get("/payments/student/:studentId", getStudentPayments);
schoolRoutes.get("/payments/history", getPaymentHistory);

schoolRoutes.post("/attendance", markAttendance);
schoolRoutes.get("/attendance/history", getSubjectSessionHistory);

schoolRoutes.get("/report/student/:studentId", getStudentReport);

export default schoolRoutes;
