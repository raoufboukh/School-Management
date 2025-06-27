import React from "react";

const Overview = ({
  student,
  payments,
  getFieldColor,
  getAttendanceRate,
}: any) => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Personal Information */}
        <div className="bg-gray-50 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            Personal Information
          </h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-600">Full Name:</span>
              <span className="font-medium">{student.name}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Email:</span>
              <span className="font-medium">{student.email}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Phone:</span>
              <span className="font-medium">
                {student.number || "Not provided"}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Education Level:</span>
              <span
                className={`px-2 py-1 rounded text-sm font-medium ${getFieldColor(
                  student.fields
                )}`}
              >
                {student.fields}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Student ID:</span>
              <span className="font-medium font-mono text-sm">
                {student._id}
              </span>
            </div>
          </div>
        </div>

        {/* Academic Summary */}
        <div className="bg-gray-50 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            Academic Summary
          </h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-600">Total Subjects:</span>
              <span className="font-medium">{payments?.length || 0}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Total Sessions Paid:</span>
              <span className="font-medium">
                {payments?.reduce(
                  (sum: any, p: any) => sum + p.totalSessionsPaid,
                  0
                ) || 0}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Sessions Completed:</span>
              <span className="font-medium">
                {payments?.reduce(
                  (sum: any, p: any) => sum + p.sessionsAttended,
                  0
                ) || 0}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Overall Attendance:</span>
              <span className="font-medium">
                {payments?.length > 0
                  ? Math.round(
                      payments.reduce(
                        (sum: any, p: any) => sum + getAttendanceRate(p),
                        0
                      ) / payments.length
                    )
                  : 0}
                %
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Status:</span>
              <span className="px-2 py-1 bg-green-100 text-green-800 rounded text-sm font-medium">
                Active
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Overview;
