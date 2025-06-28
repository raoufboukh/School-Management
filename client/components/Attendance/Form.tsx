import React, { useState } from "react";
import { subjects } from "../constants";

const Form = ({
  setSelectedField,
  setSelectedTeacher,
  setSelectedSubject,
  teachers,
  selectedTeacher,
  selectedField,
  selectedSubject,
}: any) => {
  const [classTime, setClassTime] = useState("08:00");
  const [endTime, setEndTime] = useState("09:00");
  const [classroom, setClassroom] = useState("");
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  return (
    <div className="grid grid-cols-1 md:grid-cols-6 gap-4 p-4 bg-gray-50 rounded border">
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-1">
          Date
        </label>
        <input
          type="date"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
          className="w-full border-2 border-gray-300 rounded px-2 py-1 text-sm font-mono"
        />
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-1">
          Teacher
        </label>
        <select
          value={selectedTeacher}
          onChange={(e) => setSelectedTeacher(e.target.value)}
          className="w-full border-2 border-gray-300 rounded px-2 py-1 text-sm"
        >
          <option value="">Select Teacher</option>
          {teachers.map((teacher: any) => (
            <option key={teacher._id} value={teacher._id}>
              {teacher.name}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-1">
          Subject
        </label>
        <select
          value={selectedSubject}
          onChange={(e) => setSelectedSubject(e.target.value)}
          className="w-full border-2 border-gray-300 rounded px-2 py-1 text-sm"
        >
          <option value="">Select Subject</option>
          {subjects.map((subject) => (
            <option key={subject} value={subject}>
              {subject}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-1">
          Level
        </label>
        <select
          value={selectedField}
          onChange={(e) =>
            setSelectedField(e.target.value as "" | "PRIMARY" | "CEM" | "LICEE")
          }
          className="w-full border-2 border-gray-300 rounded px-2 py-1 text-sm"
        >
          <option value="">All Levels</option>
          <option value="PRIMARY">Primary</option>
          <option value="CEM">CEM</option>
          <option value="LICEE">Lycée</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-1">
          Time
        </label>
        <div className="flex gap-1">
          <input
            type="time"
            value={classTime}
            onChange={(e) => setClassTime(e.target.value)}
            className="w-full border-2 border-gray-300 rounded px-1 py-1 text-xs font-mono"
          />
          <span className="text-gray-500 py-1">-</span>
          <input
            type="time"
            value={endTime}
            onChange={(e) => setEndTime(e.target.value)}
            className="w-full border-2 border-gray-300 rounded px-1 py-1 text-xs font-mono"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-1">
          Classroom
        </label>
        <input
          type="text"
          value={classroom}
          onChange={(e) => setClassroom(e.target.value)}
          placeholder="Room 101"
          className="w-full border-2 border-gray-300 rounded px-2 py-1 text-sm"
        />
      </div>
    </div>
  );
};

export default Form;
