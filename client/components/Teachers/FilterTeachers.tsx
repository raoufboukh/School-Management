import Link from "next/link";
import React from "react";
import {
  MdDelete,
  MdEdit,
  MdEmail,
  MdPhone,
  MdSchool,
  MdSubject,
} from "react-icons/md";

const FilterTeachers = ({ filteredTeachers, getTeacherSubjects }: any) => {
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

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {filteredTeachers.map((teacher: any) => (
        <div
          key={teacher._id}
          className="border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow duration-300 bg-gray-50"
        >
          <div className="flex items-center mb-4">
            <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center text-white font-bold text-lg mr-4">
              {teacher.name.charAt(0).toUpperCase()}
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-lg text-gray-800">
                {teacher.name}
              </h3>
              <div className="flex items-center text-sm text-gray-600 mt-1">
                <MdSchool className="mr-1" />
                <span>Teacher</span>
              </div>
            </div>
          </div>

          <div className="mb-4">
            <div className="flex items-center text-gray-700 mb-2">
              <MdSubject className="mr-2 text-gray-500" />
              <span className="text-sm font-medium">Subjects:</span>
            </div>
            <div className="flex flex-wrap gap-1">
              {getTeacherSubjects(teacher)
                .slice(0, 3)
                .map((subject: any, index: number) => (
                  <span
                    key={index}
                    className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${getSubjectBadgeColor(
                      subject
                    )}`}
                  >
                    {subject}
                  </span>
                ))}
              {getTeacherSubjects(teacher).length > 3 && (
                <span className="inline-block px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-600">
                  +{getTeacherSubjects(teacher).length - 3} more
                </span>
              )}
            </div>
          </div>

          <div className="space-y-3 mb-4">
            <div className="flex items-center text-gray-600">
              <MdEmail className="mr-3 text-gray-500 flex-shrink-0" />
              <span className="text-sm truncate">{teacher.email}</span>
            </div>

            {teacher.number && (
              <div className="flex items-center text-gray-600">
                <MdPhone className="mr-3 text-gray-500 flex-shrink-0" />
                <span className="text-sm">{teacher.number}</span>
              </div>
            )}
          </div>

          <div className="text-xs text-gray-500 mb-4">
            Joined: {formatDate(teacher.createdAt)}
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-gray-200">
            <Link href={`/teachers/${teacher._id}`}>
              <button className="text-primary hover:text-primary/80 font-medium text-sm transition-colors duration-300">
                View Details
              </button>
            </Link>

            <div className="flex items-center gap-2">
              <Link href={`/teachers/${teacher._id}/edit`}>
                <button className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-colors duration-300">
                  <MdEdit className="text-sm" />
                </button>
              </Link>

              <button className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors duration-300">
                <MdDelete className="text-sm" />
              </button>
            </div>
          </div>

          <div className="mt-4 pt-4 border-t border-gray-200">
            <div className="grid grid-cols-2 gap-4 text-center">
              <div>
                <div className="text-lg font-bold text-primary">0</div>
                <div className="text-xs text-gray-500">Active Students</div>
              </div>
              <div>
                <div className="text-lg font-bold text-green-600">
                  {getTeacherSubjects(teacher).length}
                </div>
                <div className="text-xs text-gray-500">
                  Subject
                  {getTeacherSubjects(teacher).length !== 1 ? "s" : ""}
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default FilterTeachers;
