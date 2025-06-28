"use client";
import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  MdPerson,
  MdEmail,
  MdPhone,
  MdSubject,
  MdCalendarToday,
  MdEdit,
  MdArrowBack,
  MdPrint,
  MdDownload,
} from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { getTeacher } from "@/redux/slices/schoolSlice";
import Link from "next/link";
import { AppDispatch, RootState } from "@/redux/store/store";
import { linksTeacher } from "@/components/constants";
import Overview from "@/components/Teachers/Teacher/Overview/Overview";
import Students from "@/components/Teachers/Teacher/Students/Students";
import Schedules from "@/components/Teachers/Teacher/Schedules/Schedules";
import Performance from "@/components/Teachers/Teacher/Performance/Performance";

interface Teacher {
  _id: string;
  name: string;
  email: string;
  number?: string;
  subject: string;
  subjects?: string[];
  role: string;
  createdAt: string;
}

interface TeacherStudent {
  _id: string;
  name: string;
  email: string;
  fields: "PRIMARY" | "CEM" | "LICEE";
  subject: string;
  totalSessions: number;
  attendedSessions: number;
  attendanceRate: number;
  lastAttendance: string;
}

interface ClassSchedule {
  _id: string;
  subject: string;
  dayOfWeek: string;
  startTime: string;
  endTime: string;
  classroom: string;
  studentsCount: number;
}

const Teacher = () => {
  const params = useParams();
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const { teacher, loading } = useSelector((state: RootState) => state.school);

  const [activeTab, setActiveTab] = useState("overview");
  const [teacherStudents, setTeacherStudents] = useState<TeacherStudent[]>([]);
  const [classSchedules, setClassSchedules] = useState<ClassSchedule[]>([]);

  const teacherId = params.id as string;

  useEffect(() => {
    if (teacherId) {
      dispatch(getTeacher(teacherId));
      setTeacherStudents([
        {
          _id: "1",
          name: "Alice Johnson",
          email: "alice@example.com",
          fields: "LICEE",
          subject: "Mathematics",
          totalSessions: 20,
          attendedSessions: 18,
          attendanceRate: 90,
          lastAttendance: "2024-01-15",
        },
        {
          _id: "2",
          name: "Bob Smith",
          email: "bob@example.com",
          fields: "CEM",
          subject: "Physics",
          totalSessions: 16,
          attendedSessions: 14,
          attendanceRate: 87.5,
          lastAttendance: "2024-01-14",
        },
      ]);

      setClassSchedules([
        {
          _id: "1",
          subject: "Mathematics",
          dayOfWeek: "Monday",
          startTime: "08:00",
          endTime: "09:30",
          classroom: "Room 101",
          studentsCount: 25,
        },
        {
          _id: "2",
          subject: "Physics",
          dayOfWeek: "Wednesday",
          startTime: "10:00",
          endTime: "11:30",
          classroom: "Lab 202",
          studentsCount: 20,
        },
      ]);
    }
  }, [dispatch, teacherId]);

  const getSubjectBadgeColor = (subject: string) => {
    const colors = [
      "bg-blue-100 text-blue-800",
      "bg-green-100 text-green-800",
      "bg-purple-100 text-purple-800",
      "bg-orange-100 text-orange-800",
      "bg-pink-100 text-pink-800",
      "bg-indigo-100 text-indigo-800",
    ];

    const index = subject.length % colors.length;
    return colors[index];
  };

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

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const getTeacherSubjects = (teacher: Teacher) => {
    if (teacher?.subjects && teacher.subjects.length > 0) {
      return teacher.subjects;
    }
    return teacher?.subject ? [teacher.subject] : [];
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

  if (!teacher) {
    return (
      <div className="rounded-md bg-white p-6">
        <div className="text-center py-12">
          <MdPerson className="mx-auto text-6xl text-gray-400 mb-4" />
          <h3 className="text-xl font-semibold text-gray-600 mb-2">
            Teacher Not Found
          </h3>
          <p className="text-gray-500 mb-6">
            The teacher you're looking for doesn't exist.
          </p>
          <Link href="/teachers">
            <button className="bg-primary hover:bg-primary/90 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-300">
              Back to Teachers
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
            <Link href={`/teachers/${teacherId}/edit`}>
              <button className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                <MdEdit className="text-sm" />
                Edit
              </button>
            </Link>
          </div>
        </div>

        <div className="flex items-start gap-6">
          <div className="w-24 h-24 bg-green-600 rounded-full flex items-center justify-center text-white text-3xl font-bold">
            {teacher.name.charAt(0).toUpperCase()}
          </div>

          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <h1 className="text-3xl font-bold text-gray-800">
                {teacher.name}
              </h1>
              <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                Teacher
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-gray-600 mb-4">
              <div className="flex items-center gap-2">
                <MdEmail className="text-gray-500" />
                <span>{teacher.email}</span>
              </div>

              {teacher.number && (
                <div className="flex items-center gap-2">
                  <MdPhone className="text-gray-500" />
                  <span>{teacher.number}</span>
                </div>
              )}

              <div className="flex items-center gap-2">
                <MdCalendarToday className="text-gray-500" />
                <span>Joined {formatDate(teacher.createdAt)}</span>
              </div>
            </div>

            <div className="flex items-center gap-2 mb-2">
              <MdSubject className="text-gray-500" />
              <span className="text-gray-600 font-medium">Subjects:</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {getTeacherSubjects(teacher).map((subject, index) => (
                <span
                  key={index}
                  className={`px-3 py-1 rounded-full text-sm font-medium ${getSubjectBadgeColor(
                    subject
                  )}`}
                >
                  {subject}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6">
          <div className="bg-blue-50 p-4 rounded-lg text-center">
            <div className="text-2xl font-bold text-blue-600">
              {teacherStudents.length}
            </div>
            <div className="text-sm text-blue-800">Active Students</div>
          </div>
          <div className="bg-green-50 p-4 rounded-lg text-center">
            <div className="text-2xl font-bold text-green-600">
              {getTeacherSubjects(teacher).length}
            </div>
            <div className="text-sm text-green-800">Subjects Taught</div>
          </div>
          <div className="bg-purple-50 p-4 rounded-lg text-center">
            <div className="text-2xl font-bold text-purple-600">
              {classSchedules.length}
            </div>
            <div className="text-sm text-purple-800">Weekly Classes</div>
          </div>
          <div className="bg-orange-50 p-4 rounded-lg text-center">
            <div className="text-2xl font-bold text-orange-600">
              {teacherStudents.length > 0
                ? Math.round(
                    teacherStudents.reduce(
                      (sum, s) => sum + s.attendanceRate,
                      0
                    ) / teacherStudents.length
                  )
                : 0}
              %
            </div>
            <div className="text-sm text-orange-800">Avg Attendance</div>
          </div>
        </div>
      </div>

      <div className="border-b border-gray-200">
        <nav className="flex space-x-8 px-6">
          {linksTeacher.map((tab) => (
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
            teacher={teacher}
            teacherStudents={teacherStudents}
            getTeacherSubjects={getTeacherSubjects}
            classSchedules={classSchedules}
            formatDate={formatDate}
          />
        )}
        {activeTab === "students" && (
          <Students
            teacherStudents={teacherStudents}
            formatDate={formatDate}
            getFieldColor={getFieldColor}
          />
        )}
        {activeTab === "schedule" && (
          <Schedules classSchedules={classSchedules} />
        )}
        {activeTab === "performance" && (
          <Performance
            teacher={teacher}
            teacherStudents={teacherStudents}
            getTeacherSubjects={getTeacherSubjects}
          />
        )}
      </div>
    </div>
  );
};

export default Teacher;
