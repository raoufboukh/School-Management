import React from "react";

const Analytics = ({ payments, getAttendanceRate }: any) => {
  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-gray-800">
        Performance Analytics
      </h3>

      {/* Performance Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-gray-50 rounded-lg p-6">
          <h4 className="font-semibold text-gray-800 mb-4">
            Attendance Trends
          </h4>
          <div className="space-y-3">
            {payments &&
              payments.map((payment: any) => (
                <div
                  key={payment._id}
                  className="flex justify-between items-center"
                >
                  <span className="text-sm text-gray-600">
                    {payment.subject}
                  </span>
                  <div className="flex items-center gap-2">
                    <div className="w-20 bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-primary h-2 rounded-full"
                        style={{
                          width: `${getAttendanceRate(payment)}%`,
                        }}
                      ></div>
                    </div>
                    <span className="text-sm font-medium">
                      {getAttendanceRate(payment)}%
                    </span>
                  </div>
                </div>
              ))}
          </div>
        </div>

        <div className="bg-gray-50 rounded-lg p-6">
          <h4 className="font-semibold text-gray-800 mb-4">
            Session Utilization
          </h4>
          <div className="space-y-3">
            {payments &&
              payments.map((payment: any) => {
                const utilizationRate = Math.round(
                  ((payment.sessionsAttended + payment.sessionsAbsent) /
                    payment.totalSessionsPaid) *
                    100
                );
                return (
                  <div
                    key={payment._id}
                    className="flex justify-between items-center"
                  >
                    <span className="text-sm text-gray-600">
                      {payment.subject}
                    </span>
                    <div className="flex items-center gap-2">
                      <div className="w-20 bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-blue-500 h-2 rounded-full"
                          style={{ width: `${utilizationRate}%` }}
                        ></div>
                      </div>
                      <span className="text-sm font-medium">
                        {utilizationRate}%
                      </span>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      </div>

      {/* Recommendations */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
        <h4 className="font-semibold text-blue-800 mb-3">Recommendations</h4>
        <ul className="space-y-2 text-sm text-blue-700">
          <li>• Student shows consistent attendance across most subjects</li>
          <li>
            • Consider additional practice sessions for improved performance
          </li>
          <li>• Regular communication with parents recommended</li>
        </ul>
      </div>
    </div>
  );
};

export default Analytics;
