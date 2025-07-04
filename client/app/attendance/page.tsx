"use client";
import { useState, useEffect } from "react";
import { MdCalendarToday, MdSchool, MdPrint, MdSave } from "react-icons/md";
import {
  getStudents,
  getTeachers,
  markAttendance,
} from "@/redux/slices/schoolSlice";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store/store";
import TableAttendance from "@/components/Attendance/TableAttendance";
import Form from "@/components/Attendance/Form";

interface AttendanceRecord {
  studentId: string;
  status: "present" | "absent" | "late" | "excused";
  checkInTime?: string;
  notes?: string;
}
interface Student {
  _id: string;
  name: string;
  email: string;
  fields: "PRIMARY" | "CEM" | "LICEE";
  number?: string;
}
const Attendance = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { students, teachers, loading, teacherStudents } = useSelector(
    (state: RootState) => state.school
  );
  const [selectedTeacher, setSelectedTeacher] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("");
  const [selectedField, setSelectedField] = useState<
    "" | "PRIMARY" | "CEM" | "LICEE"
  >("");

  const [attendanceRecords, setAttendanceRecords] = useState<
    Record<string, AttendanceRecord>
  >({});
  const [filteredStudents, setFilteredStudents] = useState<Student[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [notes, setNotes] = useState("");

  useEffect(() => {
    dispatch(getStudents());
    dispatch(getTeachers());
  }, [dispatch]);

  useEffect(() => {
    if (students) {
      let filtered = students;
      if (selectedTeacher && teacherStudents && teacherStudents.length > 0) {
        const teacherStudentIds = teacherStudents.map(
          (ts) => ts.studentId || ts._id
        );
        filtered = students.filter((student) =>
          teacherStudentIds.includes(student._id)
        );
      }
      if (selectedSubject) {
        filtered = filtered.filter((student) =>
          student.subjects?.includes(selectedSubject.toLowerCase())
        );
      }
      if (selectedField) {
        filtered = filtered.filter(
          (student) => student.fields === selectedField
        );
      }

      setFilteredStudents(filtered);

      const initialRecords: Record<string, AttendanceRecord> = {};
      filtered.forEach((student) => {
        initialRecords[student._id] = {
          studentId: student._id,
          status: "present",
          checkInTime: new Date().toLocaleTimeString("en-US", {
            hour12: false,
            hour: "2-digit",
            minute: "2-digit",
          }),
        };
      });
      setAttendanceRecords(initialRecords);
    }
  }, [
    students,
    selectedField,
    selectedTeacher,
    teacherStudents,
    selectedSubject,
  ]);

  const handleSubmitAttendance = async () => {
    if (!selectedTeacher || !selectedSubject) {
      alert("Please select teacher and subject");
      return;
    }

    setIsSubmitting(true);
    try {
      for (const record of Object.values(attendanceRecords)) {
        console.log("Submitting attendance:", record);
      }
      alert("Attendance submitted successfully!");
    } catch (error) {
      alert("Error submitting attendance");
    } finally {
      setIsSubmitting(false);
    }
  };

  const getAttendanceCount = () => {
    const records = Object.values(attendanceRecords);
    return {
      present: records.filter((r) => r.status === "present").length,
      absent: records.filter((r) => r.status === "absent").length,
      total: records.length,
    };
  };

  const counts = getAttendanceCount();

  return (
    <div className="bg-white min-h-screen  px-3">
      <div className="border-b-2 border-gray-800 pb-4 mb-6">
        <div className="text-center mb-4">
          <h1 className="text-2xl font-bold text-gray-800 uppercase tracking-wide">
            DAILY ATTENDANCE REGISTER
          </h1>
          <div className="flex justify-center items-center gap-8 mt-3 text-sm">
            <div className="flex items-center gap-2">
              <MdSchool className="text-gray-600" />
              <span className="font-semibold">School Management System</span>
            </div>
            <div className="flex items-center gap-2">
              <MdCalendarToday className="text-gray-600" />
              <span>Academic Year: 2024-2025</span>
            </div>
          </div>
        </div>

        <Form
          setSelectedTeacher={setSelectedTeacher}
          setSelectedSubject={setSelectedSubject}
          setSelectedField={setSelectedField}
          selectedTeacher={selectedTeacher}
          selectedSubject={selectedSubject}
          selectedField={selectedField}
          teachers={teachers}
        />

        <div className="grid grid-cols-3 gap-4 mt-4">
          <div className="text-center p-2 bg-green-50 border border-green-200 rounded">
            <div className="text-lg font-bold text-green-700">
              {counts.present}
            </div>
            <div className="text-xs text-green-600">Present</div>
          </div>
          <div className="text-center p-2 bg-red-50 border border-red-200 rounded">
            <div className="text-lg font-bold text-red-700">
              {counts.absent}
            </div>
            <div className="text-xs text-red-600">Absent</div>
          </div>
          <div className="text-center p-2 bg-gray-50 border border-gray-200 rounded">
            <div className="text-lg font-bold text-gray-700">
              {counts.total}
            </div>
            <div className="text-xs text-gray-600">Total</div>
          </div>
        </div>
      </div>

      <TableAttendance
        filteredStudents={filteredStudents}
        loading={loading}
        attendanceRecords={attendanceRecords}
        setAttendanceRecords={setAttendanceRecords}
      />
      <div className="mt-6 border-t-2 border-gray-800 pt-4">
        <div className="flex justify-between items-center">
          <div className="text-sm text-gray-600">
            <p>
              Attendance taken on: {new Date().toLocaleDateString()} at{" "}
              {new Date().toLocaleTimeString()}
            </p>
            <p>
              Teacher:{" "}
              {selectedTeacher
                ? teachers.find((t) => t._id === selectedTeacher)?.name
                : "Not selected"}
            </p>
          </div>

          <div className="flex gap-3">
            <button
              onClick={() => window.print()}
              className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded hover:bg-gray-50 transition-colors"
            >
              <MdPrint />
              Print
            </button>

            <button
              onClick={handleSubmitAttendance}
              disabled={isSubmitting || !selectedTeacher || !selectedSubject}
              className="flex items-center gap-2 px-6 py-2 bg-primary text-white rounded hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <MdSave />
              {isSubmitting ? "Submitting..." : "Submit Attendance"}
            </button>
          </div>
        </div>
      </div>
      <div className="mt-8 border-t border-gray-300 pt-6">
        <div className="grid grid-cols-2 gap-8">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Additional Notes:
            </label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full border border-gray-300 rounded px-3 py-2 h-20 text-sm"
              placeholder="Any additional notes for this class session..."
            />
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Teacher's Signature:
              </label>
              <div className="border-b-2 border-gray-800 h-12 w-64"></div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Date:
              </label>
              <div className="border-b-2 border-gray-800 h-12 w-32"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Attendance;
