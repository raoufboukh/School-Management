import React from "react";
import { MdSubject } from "react-icons/md";

const Overview = ({
  teacher,
  getTeacherSubjects,
  teacherStudents,
  classSchedules,
  formatDate,
}: any) => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-gray-50 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            Personal Information
          </h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-600">Full Name:</span>
              <span className="font-medium">{teacher.name}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Email:</span>
              <span className="font-medium">{teacher.email}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Phone:</span>
              <span className="font-medium">
                {teacher.number || "Not provided"}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Role:</span>
              <span className="font-medium capitalize">{teacher.role}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Teacher ID:</span>
              <span className="font-medium font-mono text-sm">
                {teacher._id}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Subjects Count:</span>
              <span className="font-medium">
                {getTeacherSubjects(teacher).length}
              </span>
            </div>
          </div>
        </div>

        {/* Teaching Summary */}
        <div className="bg-gray-50 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            Teaching Summary
          </h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-600">Total Students:</span>
              <span className="font-medium">{teacherStudents.length}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Weekly Classes:</span>
              <span className="font-medium">{classSchedules.length}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Average Attendance:</span>
              <span className="font-medium">
                {teacherStudents.length > 0
                  ? Math.round(
                      teacherStudents.reduce(
                        (sum: any, s: any) => sum + s.attendanceRate,
                        0
                      ) / teacherStudents.length
                    )
                  : 0}
                %
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Teaching Since:</span>
              <span className="font-medium">
                {formatDate(teacher.createdAt)}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Status:</span>
              <span className="px-2 py-1 bg-green-100 text-green-800 rounded text-sm font-medium">
                Active
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Subjects Taught */}
      <div className="bg-gray-50 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">
          Subjects Taught
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {getTeacherSubjects(teacher).map((subject: any, index: number) => (
            <div
              key={index}
              className="bg-white rounded-lg p-4 border border-gray-200"
            >
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-semibold text-gray-800">{subject}</h4>
                <MdSubject className="text-gray-500" />
              </div>
              <div className="text-sm text-gray-600">
                Students:{" "}
                {
                  teacherStudents.filter((s: any) => s.subject === subject)
                    .length
                }
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Overview;
