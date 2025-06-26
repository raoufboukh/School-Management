import React, { useState } from "react";
import { MdNotifications } from "react-icons/md";

const Account = ({ user }: any) => {
  const [notifications, setNotifications] = useState({
    emailNotifications: true,
    smsNotifications: false,
    attendanceReminders: true,
    paymentReminders: true,
    gradeUpdates: true,
  });
  const handleNotificationChange = (key: string, value: boolean) => {
    setNotifications((prev) => ({
      ...prev,
      [key]: value,
    }));
  };
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2 mb-4">
          <MdNotifications className="text-primary" />
          Notifications
        </h2>

        <div className="space-y-4">
          {Object.entries(notifications).map(([key, value]) => (
            <div key={key} className="flex items-center justify-between">
              <label className="text-sm text-gray-700 capitalize">
                {key.replace(/([A-Z])/g, " $1").trim()}
              </label>
              <button
                onClick={() => handleNotificationChange(key, !value)}
                className={`relative inline-flex w-10 h-6 rounded-full transition-colors ${
                  value ? "bg-primary" : "bg-gray-200"
                }`}
              >
                <span
                  className={`inline-block w-4 h-4 rounded-full bg-white transform transition-transform ${
                    value ? "translate-x-5" : "translate-x-1"
                  } mt-1`}
                />
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Account Information
        </h2>

        <div className="space-y-3 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-600">Account Type:</span>
            <span className="font-medium">{user?.role}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Member Since:</span>
            <span className="font-medium">{user?.createdAt.slice(0, 10)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Last Login:</span>
            <span className="font-medium">Today</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Account;
