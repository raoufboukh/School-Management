import React from "react";

const TeachersCount = ({
  filteredTeachers,
  getTeacherSubjects,
  teachers,
}: any) => {
  return (
    filteredTeachers.length > 0 && (
      <div className="my-5 grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-green-50 p-4 rounded-lg text-center">
          <div className="text-2xl font-bold text-green-600">
            {teachers.length}
          </div>
          <div className="text-sm text-green-800">Total Teachers</div>
        </div>
        <div className="bg-blue-50 p-4 rounded-lg text-center">
          <div className="text-2xl font-bold text-blue-600">
            {teachers.reduce(
              (acc: any, teacher: any) =>
                acc + getTeacherSubjects(teacher).length,
              0
            )}
          </div>
          <div className="text-sm text-blue-800">Total Subjects Taught</div>
        </div>

        <div className="bg-purple-50 p-4 rounded-lg text-center">
          <div className="text-2xl font-bold text-purple-600">
            {Math.round(
              teachers.reduce(
                (acc: any, teacher: any) =>
                  acc + getTeacherSubjects(teacher).length,
                0
              ) / teachers.length || 0
            )}
          </div>
          <div className="text-sm text-purple-800">Avg Subjects/Teacher</div>
        </div>

        <div className="bg-orange-50 p-4 rounded-lg text-center">
          <div className="text-2xl font-bold text-orange-600">0</div>
          <div className="text-sm text-orange-800">Active Classes</div>
        </div>
      </div>
    )
  );
};

export default TeachersCount;
