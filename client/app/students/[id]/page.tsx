"use client";
import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  MdPerson,
  MdEmail,
  MdPhone,
  MdCalendarToday,
  MdEdit,
  MdArrowBack,
  MdPrint,
  MdDownload,
} from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import {
  getStudent,
  getStudentPayments,
  getStudentReport,
} from "@/redux/slices/schoolSlice";
import Link from "next/link";
import { AppDispatch, RootState } from "@/redux/store/store";
import Overview from "@/components/Students/Student/Overview/Overview";
import Payment from "@/components/Students/Student/Payment/Payment";
import Attendance from "@/components/Students/Student/Attendance/Attendance";
import Analytics from "@/components/Students/Student/Analytics/Analytics";
import { linksStudent } from "@/components/constants";

interface Student {
  _id: string;
  name: string;
  email: string;
  number?: string;
  fields: "PRIMARY" | "CEM" | "LICEE";
  role: string;
  createdAt: string;
}

interface Payment {
  _id: string;
  subject: string;
  teacherId: {
    _id: string;
    name: string;
    email: string;
  };
  amount: number;
  totalSessionsPaid: number;
  sessionsRemaining: number;
  sessionsAttended: number;
  sessionsAbsent: number;
  paymentDate: string;
  isActive: boolean;
}

const Student = () => {
  const params = useParams();
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const { student, payments, loading } = useSelector(
    (state: RootState) => state.school
  );

  const [activeTab, setActiveTab] = useState("overview");
  const studentId = params.id as string;

  useEffect(() => {
    if (studentId) {
      dispatch(getStudent(studentId));
      dispatch(getStudentPayments(studentId));
      dispatch(getStudentReport(studentId));
    }
  }, [dispatch, studentId]);

  const getFieldColor = (field: string) => {
    switch (field) {
      case "PRIMARY":
        return "bg-green-100 text-green-800";
      case "CEM":
        return "bg-blue-100 text-blue-800";
      case "LICEE":
        return "bg-purple-100 text-purple-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getAttendanceRate = (payment: Payment) => {
    const totalSessions = payment.sessionsAttended + payment.sessionsAbsent;
    if (totalSessions === 0) return 0;
    return Math.round((payment.sessionsAttended / totalSessions) * 100);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  if (loading) {
    return (
      <div className="rounded-md bg-white p-6">
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
      </div>
    );
  }

  if (!student) {
    return (
      <div className="rounded-md bg-white p-6">
        <div className="text-center py-12">
          <MdPerson className="mx-auto text-6xl text-gray-400 mb-4" />
          <h3 className="text-xl font-semibold text-gray-600 mb-2">
            Student Not Found
          </h3>
          <p className="text-gray-500 mb-6">
            The student you're looking for doesn't exist.
          </p>
          <Link href="/students">
            <button className="bg-primary hover:bg-primary/90 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-300">
              Back to Students
            </button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-md">
      <div className="border-b border-gray-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-800 transition-colors"
          >
            <MdArrowBack />
            <span>Back</span>
          </button>

          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
              <MdPrint className="text-sm" />
              Print Profile
            </button>
            <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
              <MdDownload className="text-sm" />
              Export
            </button>
            <Link href={`/students/${studentId}/edit`}>
              <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                <MdEdit className="text-sm" />
                Edit
              </button>
            </Link>
          </div>
        </div>

        <div className="flex items-start gap-6">
          <div className="w-24 h-24 bg-primary rounded-full flex items-center justify-center text-white text-3xl font-bold">
            {student.name.charAt(0).toUpperCase()}
          </div>

          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <h1 className="text-3xl font-bold text-gray-800">
                {student.name}
              </h1>
              <span
                className={`px-3 py-1 rounded-full text-sm font-medium ${getFieldColor(
                  student.fields
                )}`}
              >
                {student.fields}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-gray-600">
              <div className="flex items-center gap-2">
                <MdEmail className="text-gray-500" />
                <span>{student.email}</span>
              </div>

              {student.number && (
                <div className="flex items-center gap-2">
                  <MdPhone className="text-gray-500" />
                  <span>{student.number}</span>
                </div>
              )}

              <div className="flex items-center gap-2">
                <MdCalendarToday className="text-gray-500" />
                <span>Joined {formatDate(student.createdAt)}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6">
          <div className="bg-blue-50 p-4 rounded-lg text-center">
            <div className="text-2xl font-bold text-blue-600">
              {payments?.length || 0}
            </div>
            <div className="text-sm text-blue-800">Active Subjects</div>
          </div>
          <div className="bg-green-50 p-4 rounded-lg text-center">
            <div className="text-2xl font-bold text-green-600">
              {payments?.reduce((sum, p) => sum + p.sessionsAttended, 0) || 0}
            </div>
            <div className="text-sm text-green-800">Sessions Attended</div>
          </div>
          <div className="bg-orange-50 p-4 rounded-lg text-center">
            <div className="text-2xl font-bold text-orange-600">
              {payments?.reduce((sum, p) => sum + p.sessionsRemaining, 0) || 0}
            </div>
            <div className="text-sm text-orange-800">Sessions Remaining</div>
          </div>
          <div className="bg-purple-50 p-4 rounded-lg text-center">
            <div className="text-2xl font-bold text-purple-600">
              {payments?.length > 0
                ? Math.round(
                    payments.reduce((sum, p) => sum + getAttendanceRate(p), 0) /
                      payments.length
                  )
                : 0}
              %
            </div>
            <div className="text-sm text-purple-800">Avg Attendance</div>
          </div>
        </div>
      </div>

      <div className="border-b border-gray-200">
        <nav className="flex space-x-8 px-6">
          {linksStudent.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 py-4 border-b-2 font-medium text-sm transition-colors ${
                activeTab === tab.id
                  ? "border-primary text-primary"
                  : "border-transparent text-gray-500 hover:text-gray-700"
              }`}
            >
              <tab.icon className="text-lg" />
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      <div className="p-6">
        {activeTab === "overview" && (
          <Overview
            student={student}
            payments={payments}
            getFieldColor={getFieldColor}
            getAttendanceRate={getAttendanceRate}
          />
        )}

        {activeTab === "payments" && (
          <Payment
            payments={payments}
            studentId={studentId}
            getAttendanceRate={getAttendanceRate}
            formatDate={formatDate}
          />
        )}

        {activeTab === "attendance" && (
          <Attendance
            payments={payments}
            getAttendanceRate={getAttendanceRate}
          />
        )}

        {activeTab === "analytics" && (
          <Analytics
            payments={payments}
            getAttendanceRate={getAttendanceRate}
          />
        )}
      </div>
    </div>
  );
};

export default Student;
