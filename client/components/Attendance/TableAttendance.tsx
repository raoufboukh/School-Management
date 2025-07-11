import { tableAttendance } from "../constants";

const TableAttendance = ({
  filteredStudents,
  loading,
  attendanceRecords,
  setAttendanceRecords,
  handleSubmitAttendance,
  isSubmitting,
}: any) => {
  const handleAttendanceChange = (
    studentId: string,
    status: "present" | "absent"
  ) => {
    const currentTime = new Date().toLocaleTimeString("en-US", {
      hour12: false,
      hour: "2-digit",
      minute: "2-digit",
    });

    setAttendanceRecords((prev: any) => ({
      ...prev,
      [studentId]: {
        ...prev[studentId],
        studentId,
        status,
        checkInTime: status === "present" ? currentTime : undefined,
      },
    }));
  };

  const handleIndividualSubmit = async (studentId: string) => {
    const record = attendanceRecords[studentId];
    if (!record || !record.status) {
      alert("Please select attendance status first");
      return;
    }

    await handleSubmitAttendance(studentId);
  };

  const isStudentSubmitted = (studentId: string) => {
    return attendanceRecords[studentId]?.submitted || false;
  };

  return (
    <div className="overflow-x-auto">
      <table className="w-full border-2 border-gray-800">
        <thead>
          <tr className="bg-gray-100 border-b-2 border-gray-800">
            {tableAttendance.map((header) => (
              <th
                key={header.title}
                className={`border-r border-gray-800 px-4 py-3 text-left text-sm font-bold`}
              >
                <div className="flex items-center justify-center gap-2">
                  {header.icon && <header.icon className={header.classes} />}
                  {header.title}
                </div>
              </th>
            ))}
            {/* Add new column for action button */}
            <th className="border-r border-gray-800 px-4 py-3 text-center text-sm font-bold">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {filteredStudents.length === 0 ? (
            <tr>
              <td colSpan={7} className="text-center py-8 text-gray-500">
                {loading
                  ? "Loading students..."
                  : "No students found for selected criteria"}
              </td>
            </tr>
          ) : (
            filteredStudents.map((student: any, index: any) => (
              <tr
                key={student._id}
                className={`border-b border-gray-300 hover:bg-gray-50 ${
                  isStudentSubmitted(student._id) ? "bg-green-50" : ""
                }`}
              >
                <td className="border-r border-gray-300 px-4 py-3 text-center font-mono text-sm">
                  {index + 1}
                </td>
                <td className="border-r border-gray-300 px-4 py-3 text-sm font-medium">
                  <div>
                    <div className="font-semibold">{student.name}</div>
                    <div className="text-xs text-gray-500">{student.email}</div>
                  </div>
                </td>
                <td className="border-r border-gray-300 px-4 py-3 text-sm">
                  <span
                    className={`px-2 py-1 rounded text-xs font-medium ${
                      student.fields === "PRIMARY"
                        ? "bg-green-100 text-green-800"
                        : student.fields === "CEM"
                        ? "bg-blue-100 text-blue-800"
                        : "bg-purple-100 text-purple-800"
                    }`}
                  >
                    {student.fields}
                  </span>
                </td>
                <td className="border-r border-gray-300 px-4 py-3 text-center">
                  <input
                    type="radio"
                    name={`attendance-${student._id}`}
                    checked={
                      attendanceRecords[student._id]?.status === "present"
                    }
                    onChange={() =>
                      handleAttendanceChange(student._id, "present")
                    }
                    className="w-4 h-4 text-green-600 focus:ring-green-500"
                    disabled={isStudentSubmitted(student._id)}
                  />
                </td>
                <td className="border-r border-gray-300 px-4 py-3 text-center">
                  <input
                    type="radio"
                    name={`attendance-${student._id}`}
                    checked={
                      attendanceRecords[student._id]?.status === "absent"
                    }
                    onChange={() =>
                      handleAttendanceChange(student._id, "absent")
                    }
                    className="w-4 h-4 text-red-600 focus:ring-red-500"
                    disabled={isStudentSubmitted(student._id)}
                  />
                </td>
                <td className="border-r border-gray-300 px-4 py-3 text-center text-xs font-mono">
                  {attendanceRecords[student._id]?.checkInTime || "-"}
                </td>
                {/* New Action Column */}
                <td className="border-r border-gray-300 px-4 py-3 text-center">
                  {isStudentSubmitted(student._id) ? (
                    <span className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-green-100 text-green-800">
                      ✓ Submitted
                    </span>
                  ) : (
                    <button
                      onClick={() => handleIndividualSubmit(student._id)}
                      disabled={
                        isSubmitting || !attendanceRecords[student._id]?.status
                      }
                      className={`px-3 py-1 rounded text-xs font-medium transition-colors duration-200 ${
                        attendanceRecords[student._id]?.status
                          ? "bg-blue-600 hover:bg-blue-700 text-white cursor-pointer"
                          : "bg-gray-300 text-gray-500 cursor-not-allowed"
                      } ${isSubmitting ? "opacity-50 cursor-not-allowed" : ""}`}
                    >
                      {isSubmitting ? (
                        <div className="flex items-center gap-1">
                          <div className="w-3 h-3 border border-white border-t-transparent rounded-full animate-spin"></div>
                          <span>...</span>
                        </div>
                      ) : (
                        "Mark"
                      )}
                    </button>
                  )}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default TableAttendance;
