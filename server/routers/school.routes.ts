import express from "express";
import {
  processSubjectPayment,
  getStudentPayments,
  getPaymentHistory,
  markAttendance,
  getSubjectSessionHistory,
  getStudentReport,
} from "../controllers/school.controllers.js";

const schoolRoutes = express.Router();

// Payment Routes
schoolRoutes.post("/payment", processSubjectPayment);
schoolRoutes.get("/payments/student/:studentId", getStudentPayments);
schoolRoutes.get("/payments/history", getPaymentHistory);

// Attendance Routes
schoolRoutes.post("/attendance", markAttendance);
schoolRoutes.get("/attendance/history", getSubjectSessionHistory);

// Reports Routes
schoolRoutes.get("/report/student/:studentId", getStudentReport);

export default schoolRoutes;
