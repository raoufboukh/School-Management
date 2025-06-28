import React from "react";
import { MdAssignment, MdStar, MdTrendingUp } from "react-icons/md";

const Performance = ({ getTeacherSubjects, teacherStudents, teacher }: any) => {
  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-gray-800">
        Teaching Performance
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-green-50 border border-green-200 rounded-lg p-6 text-center">
          <MdStar className="mx-auto text-3xl text-green-600 mb-2" />
          <div className="text-2xl font-bold text-green-700">4.8</div>
          <div className="text-sm text-green-600">Average Rating</div>
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 text-center">
          <MdTrendingUp className="mx-auto text-3xl text-blue-600 mb-2" />
          <div className="text-2xl font-bold text-blue-700">
            {teacherStudents.length > 0
              ? Math.round(
                  teacherStudents.reduce(
                    (sum: any, s: any) => sum + s.attendanceRate,
                    0
                  ) / teacherStudents.length
                )
              : 0}
            %
          </div>
          <div className="text-sm text-blue-600">Student Attendance</div>
        </div>

        <div className="bg-purple-50 border border-purple-200 rounded-lg p-6 text-center">
          <MdAssignment className="mx-auto text-3xl text-purple-600 mb-2" />
          <div className="text-2xl font-bold text-purple-700">95%</div>
          <div className="text-sm text-purple-600">Class Completion</div>
        </div>
      </div>

      <div className="bg-gray-50 rounded-lg p-6">
        <h4 className="font-semibold text-gray-800 mb-4">
          Performance by Subject
        </h4>
        <div className="space-y-4">
          {getTeacherSubjects(teacher).map((subject: any, index: number) => {
            const subjectStudents = teacherStudents.filter(
              (s: any) => s.subject === subject
            );
            const avgAttendance =
              subjectStudents.length > 0
                ? Math.round(
                    subjectStudents.reduce(
                      (sum: any, s: any) => sum + s.attendanceRate,
                      0
                    ) / subjectStudents.length
                  )
                : 0;

            return (
              <div key={index} className="flex justify-between items-center">
                <div>
                  <span className="font-medium text-gray-800">{subject}</span>
                  <span className="text-sm text-gray-600 ml-2">
                    ({subjectStudents.length} students)
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-24 bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-primary h-2 rounded-full"
                      style={{ width: `${avgAttendance}%` }}
                    ></div>
                  </div>
                  <span className="text-sm font-medium w-12">
                    {avgAttendance}%
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Performance Insights */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
        <h4 className="font-semibold text-blue-800 mb-3">
          Performance Insights
        </h4>
        <ul className="space-y-2 text-sm text-blue-700">
          <li>• Excellent student attendance rates across all subjects</li>
          <li>• High student engagement and participation</li>
          <li>• Consistent performance in all teaching areas</li>
          <li>• Strong communication with students and parents</li>
        </ul>
      </div>
    </div>
  );
};

export default Performance;
