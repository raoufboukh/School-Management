import React from "react";
import {
  MdAccessTime,
  MdDelete,
  MdEdit,
  MdPerson,
  MdRoom,
  MdSchedule,
  MdSchool,
} from "react-icons/md";
import { tableSchedules } from "../constants";
import { deleteSchedule } from "@/redux/slices/ScheduleSlice";

const TableSchedules = ({
  teachers,
  schedulesLoading,
  schedules,
  dispatch,
  handleEditSchedule,
}: any) => {
  const getTeacherName = (teacherId: string) => {
    const teacher = teachers.find((t: any) => t._id === teacherId);
    return teacher
      ? teacher.name.slice(0, 1).toUpperCase() + teacher.name.slice(1)
      : "Unknown";
  };

  const formatTime = (time: string) => {
    return time || "N/A";
  };
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200">
      <div className="p-4 border-b border-gray-200">
        <h2 className="text-xl font-semibold text-gray-800">All Schedules</h2>
      </div>

      {schedulesLoading ? (
        <div className="p-8 text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading schedules...</p>
        </div>
      ) : schedules && schedules.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                {tableSchedules.map((header) => (
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {schedules.map((schedule: any) => (
                <tr key={schedule._id} className="hover:bg-gray-50">
                  <td className="px-4 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <MdPerson className="text-blue-600 mr-2" />
                      <span className="font-medium text-gray-900">
                        {getTeacherName(schedule.teacherId)}
                      </span>
                    </div>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <MdSchool className="text-purple-600 mr-2" />
                      <span className="text-gray-900">
                        {schedule.subject.slice(0, 1).toUpperCase() +
                          schedule.subject.slice(1)}
                      </span>
                    </div>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap">
                    <span className="text-gray-900">{schedule.dayOfWeek}</span>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <MdAccessTime className="text-orange-600 mr-2" />
                      <span className="text-gray-900">
                        {formatTime(schedule.startTime)} -{" "}
                        {formatTime(schedule.endTime)}
                      </span>
                    </div>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <MdRoom className="text-green-600 mr-2" />
                      <span className="text-gray-900">
                        {schedule.classroom}
                      </span>
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <div className="text-sm text-gray-900">
                      <span className="font-medium">
                        {schedule.studentIds?.length || 0}/
                        {schedule.maxStudents || 10}
                      </span>
                    </div>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        schedule.isActive
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {schedule.isActive ? "Active" : "Inactive"}
                    </span>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex items-center gap-2">
                      <button
                        className="text-blue-600 hover:text-blue-800 cursor-pointer"
                        onClick={() => {
                          handleEditSchedule(schedule);
                        }}
                      >
                        <MdEdit />
                      </button>
                      <button
                        className="text-red-600 hover:text-red-800 cursor-pointer"
                        onClick={() => dispatch(deleteSchedule(schedule._id))}
                      >
                        <MdDelete />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="p-8 text-center">
          <MdSchedule className="text-gray-400 text-6xl mx-auto mb-4" />
          <p className="text-gray-500 text-lg">No schedules found</p>
          <p className="text-gray-400 text-sm mt-2">
            Click "Create Schedule" to add your first schedule
          </p>
        </div>
      )}
    </div>
  );
};

export default TableSchedules;
