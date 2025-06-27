import Link from "next/link";
import { MdDelete, MdEdit, MdEmail, MdPhone } from "react-icons/md";

const FilterStudents = ({ filteredStudents }: any) => {
  const getFieldsBadgeColor = (field: string) => {
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
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {filteredStudents.map((student: any) => (
        <div
          key={student._id}
          className="border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow duration-300 bg-gray-50"
        >
          <div className="flex items-center mb-4">
            <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-white font-bold text-lg mr-4">
              {student.name.charAt(0).toUpperCase()}
            </div>
            <div>
              <h3 className="font-semibold text-lg text-gray-800">
                {student.name}
              </h3>
              <span
                className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${getFieldsBadgeColor(
                  student.fields
                )}`}
              >
                {student.fields}
              </span>
            </div>
          </div>

          <div className="space-y-3 mb-4">
            <div className="flex items-center text-gray-600">
              <MdEmail className="mr-3 text-gray-500" />
              <span className="text-sm truncate">{student.email}</span>
            </div>

            {student.number && (
              <div className="flex items-center text-gray-600">
                <MdPhone className="mr-3 text-gray-500" />
                <span className="text-sm">{student.number}</span>
              </div>
            )}
          </div>

          <div className="text-xs text-gray-500 mb-4">
            Registered: {formatDate(student.createdAt)}
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-gray-200">
            <Link
              href={`/students/${student._id}`}
              className="text-primary hover:text-primary/80 font-medium text-sm transition-colors duration-300"
            >
              View Details
            </Link>

            <div className="flex items-center gap-2">
              <Link
                href={`/students/${student._id}/edit`}
                className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-colors duration-300"
              >
                <MdEdit className="text-sm" />
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
                <div className="text-xs text-gray-500">Active Payments</div>
              </div>
              <div>
                <div className="text-lg font-bold text-green-600">0%</div>
                <div className="text-xs text-gray-500">Attendance Rate</div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default FilterStudents;
