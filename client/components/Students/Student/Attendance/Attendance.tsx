import React from "react";
import {
  MdAccessTime,
  MdCancel,
  MdCheckCircle,
  MdWarning,
} from "react-icons/md";

const Attendance = ({ payments, getAttendanceRate }: any) => {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-gray-800">Recent Attendance</h3>

      {/* Attendance Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-center">
          <MdCheckCircle className="mx-auto text-2xl text-green-600 mb-2" />
          <div className="text-lg font-bold text-green-700">
            {payments?.reduce(
              (sum: any, p: any) => sum + p.sessionsAttended,
              0
            ) || 0}
          </div>
          <div className="text-sm text-green-600">Present</div>
        </div>

        <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-center">
          <MdCancel className="mx-auto text-2xl text-red-600 mb-2" />
          <div className="text-lg font-bold text-red-700">
            {payments?.reduce(
              (sum: any, p: any) => sum + p.sessionsAbsent,
              0
            ) || 0}
          </div>
          <div className="text-sm text-red-600">Absent</div>
        </div>

        <div className="bg-orange-50 border border-orange-200 rounded-lg p-4 text-center">
          <MdAccessTime className="mx-auto text-2xl text-orange-600 mb-2" />
          <div className="text-lg font-bold text-orange-700">0</div>
          <div className="text-sm text-orange-600">Late</div>
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-center">
          <MdWarning className="mx-auto text-2xl text-blue-600 mb-2" />
          <div className="text-lg font-bold text-blue-700">0</div>
          <div className="text-sm text-blue-600">Excused</div>
        </div>
      </div>

      {/* Subject-wise Attendance */}
      <div className="space-y-4">
        {payments &&
          payments.map((payment: any) => (
            <div
              key={payment._id}
              className="border border-gray-200 rounded-lg p-4"
            >
              <div className="flex justify-between items-center mb-3">
                <div>
                  <h4 className="font-semibold text-gray-800">
                    {payment.subject}
                  </h4>
                  <p className="text-sm text-gray-600">
                    Teacher: {payment.teacherId.name}
                  </p>
                </div>
                <div className="text-right">
                  <div className="text-lg font-bold text-primary">
                    {getAttendanceRate(payment)}%
                  </div>
                  <div className="text-sm text-gray-600">Attendance Rate</div>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4 text-center">
                <div className="bg-green-50 p-3 rounded">
                  <div className="text-lg font-bold text-green-600">
                    {payment.sessionsAttended}
                  </div>
                  <div className="text-xs text-green-700">Present</div>
                </div>
                <div className="bg-red-50 p-3 rounded">
                  <div className="text-lg font-bold text-red-600">
                    {payment.sessionsAbsent}
                  </div>
                  <div className="text-xs text-red-700">Absent</div>
                </div>
                <div className="bg-gray-50 p-3 rounded">
                  <div className="text-lg font-bold text-gray-600">
                    {payment.sessionsRemaining}
                  </div>
                  <div className="text-xs text-gray-700">Remaining</div>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Attendance;
