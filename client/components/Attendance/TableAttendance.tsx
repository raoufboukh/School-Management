import { tableAttendance } from "../constants";

const TableAttendance = ({
  filteredStudents,
  loading,
  attendanceRecords,
  setAttendanceRecords,
}: any) => {
  const handleAttendanceChange = (
    studentId: string,
    status: "present" | "absent" | "late" | "excused"
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
        status,
        checkInTime:
          status === "present" || status === "late" ? currentTime : undefined,
      },
    }));
  };
  return (
    <div className="overflow-x-auto">
      <table className="w-full border-2 border-gray-800">
        <thead>
          <tr className="bg-gray-100 border-b-2 border-gray-800">
            {tableAttendance.map((header) => (
              <th
                key={header.title}
                className={`border-r border-gray-800 px-4 py-3 text-left text-sm font-bold `}
              >
                <div className="flex items-center justify-center gap-2">
                  {header.icon && <header.icon className={header.classes} />}
                  {header.title}
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {filteredStudents.length === 0 ? (
            <tr>
              <td colSpan={6} className="text-center py-8 text-gray-500">
                {loading
                  ? "Loading students..."
                  : "No students found for selected criteria"}
              </td>
            </tr>
          ) : (
            filteredStudents.map((student: any, index: any) => (
              <tr
                key={student._id}
                className="border-b border-gray-300 hover:bg-gray-50"
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
                  />
                </td>
                <td className="border-r border-gray-300 px-4 py-3 text-center text-xs font-mono">
                  {attendanceRecords[student._id]?.checkInTime || "-"}
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
