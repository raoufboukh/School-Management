import Link from "next/link";
import React from "react";
import { MdGroup } from "react-icons/md";

const Students = ({ teacherStudents, formatDate, getFieldColor }: any) => {
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold text-gray-800">
          Students Under This Teacher
        </h3>
        <div className="text-sm text-gray-600">
          Total: {teacherStudents.length} students
        </div>
      </div>

      {teacherStudents.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="w-full border border-gray-200 rounded-lg">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-900">
                  Student
                </th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-900">
                  Level
                </th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-900">
                  Subject
                </th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-900">
                  Sessions
                </th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-900">
                  Attended
                </th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-900">
                  Attendance Rate
                </th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-900">
                  Last Attendance
                </th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-900">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {teacherStudents.map((student: any) => (
                <tr key={student._id} className="hover:bg-gray-50">
                  <td className="px-4 py-3">
                    <div>
                      <div className="font-medium text-gray-900">
                        {student.name}
                      </div>
                      <div className="text-sm text-gray-500">
                        {student.email}
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${getFieldColor(
                        student.fields
                      )}`}
                    >
                      {student.fields}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-900">
                    {student.subject}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-900">
                    {student.totalSessions}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-900">
                    {student.attendedSessions}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <div className="w-16 bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-primary h-2 rounded-full"
                          style={{ width: `${student.attendanceRate}%` }}
                        ></div>
                      </div>
                      <span className="text-sm font-medium">
                        {student.attendanceRate}%
                      </span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-900">
                    {formatDate(student.lastAttendance)}
                  </td>
                  <td className="px-4 py-3">
                    <Link href={`/students/${student._id}`}>
                      <button className="text-primary hover:text-primary/80 text-sm font-medium">
                        View
                      </button>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="text-center py-8 text-gray-500">
          <MdGroup className="mx-auto text-4xl mb-2" />
          <p>No students assigned to this teacher yet</p>
        </div>
      )}
    </div>
  );
};

export default Students;
