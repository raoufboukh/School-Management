import React from "react";
import { MdAccessTime, MdCheck, MdClose, MdWarning } from "react-icons/md";

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

  const handleNotesChange = (studentId: string, notes: string) => {
    setAttendanceRecords((prev: any) => ({
      ...prev,
      [studentId]: {
        ...prev[studentId],
        notes,
      },
    }));
  };
  return (
    <div className="overflow-x-auto">
      <table className="w-full border-2 border-gray-800">
        <thead>
          <tr className="bg-gray-100 border-b-2 border-gray-800">
            <th className="border-r border-gray-800 px-4 py-3 text-left text-sm font-bold w-12">
              No.
            </th>
            <th className="border-r border-gray-800 px-4 py-3 text-left text-sm font-bold w-48">
              Student Name
            </th>
            <th className="border-r border-gray-800 px-4 py-3 text-left text-sm font-bold w-32">
              Level
            </th>
            <th className="border-r border-gray-800 px-4 py-3 text-center text-sm font-bold w-32">
              <div className="flex justify-center items-center gap-2">
                <MdCheck className="text-green-600" />
                Present
              </div>
            </th>
            <th className="border-r border-gray-800 px-4 py-3 text-center text-sm font-bold w-32">
              <div className="flex justify-center items-center gap-2">
                <MdClose className="text-red-600" />
                Absent
              </div>
            </th>
            <th className="border-r border-gray-800 px-4 py-3 text-center text-sm font-bold w-32">
              <div className="flex justify-center items-center gap-2">
                <MdAccessTime className="text-orange-600" />
                Late
              </div>
            </th>
            <th className="border-r border-gray-800 px-4 py-3 text-center text-sm font-bold w-32">
              <div className="flex justify-center items-center gap-2">
                <MdWarning className="text-blue-600" />
                Excused
              </div>
            </th>
            <th className="border-r border-gray-800 px-4 py-3 text-center text-sm font-bold w-24">
              Time In
            </th>
            <th className="px-4 py-3 text-left text-sm font-bold">Notes</th>
          </tr>
        </thead>
        <tbody>
          {filteredStudents.length === 0 ? (
            <tr>
              <td colSpan={9} className="text-center py-8 text-gray-500">
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
                <td className="border-r border-gray-300 px-4 py-3 text-center">
                  <input
                    type="radio"
                    name={`attendance-${student._id}`}
                    checked={attendanceRecords[student._id]?.status === "late"}
                    onChange={() => handleAttendanceChange(student._id, "late")}
                    className="w-4 h-4 text-orange-600 focus:ring-orange-500"
                  />
                </td>
                <td className="border-r border-gray-300 px-4 py-3 text-center">
                  <input
                    type="radio"
                    name={`attendance-${student._id}`}
                    checked={
                      attendanceRecords[student._id]?.status === "excused"
                    }
                    onChange={() =>
                      handleAttendanceChange(student._id, "excused")
                    }
                    className="w-4 h-4 text-blue-600 focus:ring-blue-500"
                  />
                </td>
                <td className="border-r border-gray-300 px-4 py-3 text-center text-xs font-mono">
                  {attendanceRecords[student._id]?.checkInTime || "-"}
                </td>
                <td className="px-4 py-3">
                  <input
                    type="text"
                    placeholder="Notes..."
                    value={attendanceRecords[student._id]?.notes || ""}
                    onChange={(e) =>
                      handleNotesChange(student._id, e.target.value)
                    }
                    className="w-full text-xs border-0 bg-transparent focus:outline-none focus:bg-white focus:border focus:border-gray-300 rounded px-2 py-1"
                  />
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
