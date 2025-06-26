"use client";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            Welcome to Greenwood High School
          </h1>
          <p className="text-lg text-accent">
            Excellence in Education Since 1985
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <div className="text-3xl font-bold text-blue-600 mb-2">1,247</div>
            <div className="text-accent">Total Students</div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <div className="text-3xl font-bold text-green-600 mb-2">89</div>
            <div className="text-accent">Teachers</div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <div className="text-3xl font-bold text-purple-600 mb-2">45</div>
            <div className="text-accent">Classes</div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <div className="text-3xl font-bold text-orange-600 mb-2">12</div>
            <div className="text-accent">Departments</div>
          </div>
        </div>

        {/* Quick Info */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">
              Recent Announcements
            </h3>
            <ul className="space-y-3">
              <li className="border-l-4 border-blue-500 pl-4">
                <div className="font-medium">Parent-Teacher Meeting</div>
                <div className="text-sm text-accent">November 15, 2024</div>
              </li>
              <li className="border-l-4 border-green-500 pl-4">
                <div className="font-medium">Science Fair Registration</div>
                <div className="text-sm text-accent">November 20, 2024</div>
              </li>
              <li className="border-l-4 border-purple-500 pl-4">
                <div className="font-medium">Winter Break Schedule</div>
                <div className="text-sm text-accent">December 18, 2024</div>
              </li>
            </ul>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">
              Quick Links
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <button className="bg-blue-100 hover:bg-blue-200 text-blue-800 py-3 px-4 rounded-lg transition-colors">
                Student Portal
              </button>
              <button className="bg-green-100 hover:bg-green-200 text-success py-3 px-4 rounded-lg transition-colors">
                Teacher Portal
              </button>
              <button className="bg-purple-100 hover:bg-purple-200 text-purple-800 py-3 px-4 rounded-lg transition-colors">
                Library
              </button>
              <button className="bg-orange-100 hover:bg-orange-200 text-error py-3 px-4 rounded-lg transition-colors">
                Events
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
