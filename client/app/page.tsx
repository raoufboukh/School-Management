"use client";
import { announcements, quickLinks } from "@/components/constants";
import { getStudents, getTeachers } from "@/redux/slices/schoolSlice";
import { AppDispatch, RootState } from "@/redux/store/store";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function Home() {
  const { teachers } = useSelector((state: RootState) => state.school);
  const { students } = useSelector((state: RootState) => state.school);
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    dispatch(getTeachers());
    dispatch(getStudents());
  }, [dispatch]);
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            Welcome to Greenwood High School
          </h1>
          <p className="text-lg text-accent">
            Excellence in Education Since 1985
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <div className="text-3xl font-bold text-blue-600 mb-2">
              {students.length}
            </div>
            <div className="text-accent">Total Students</div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <div className="text-3xl font-bold text-green-600 mb-2">
              {teachers.length}
            </div>
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
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">
              Recent Announcements
            </h3>
            <ul className="space-y-3">
              {announcements.map((announcement) => (
                <li key={announcement.id} className={announcement.classes}>
                  <div className="font-medium">{announcement.title}</div>
                  <div className="text-sm text-accent">{announcement.date}</div>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">
              Quick Links
            </h3>
            <div className="grid grid-cols-2 gap-4">
              {quickLinks.map((link, index) => (
                <button
                  key={index}
                  className={`${link.classes} w-full text-center font-medium transition-colors`}
                >
                  {link.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
