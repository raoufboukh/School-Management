"use client";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store/store";
import { getTeachers, getStudents } from "@/redux/slices/schoolSlice";
import { getAllSchedules } from "@/redux/slices/ScheduleSlice";
import { MdAdd, MdSchedule } from "react-icons/md";
import TableSchedules from "@/components/Schedules/TableSchedules";
import CreateSchedule from "@/components/Schedules/CreateSchedule";
import UpdateSchedule from "@/components/Schedules/UpdateSchedule";

const Schedules = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { teachers, students } = useSelector(
    (state: RootState) => state.school
  );
  const { schedules, loading: schedulesLoading } = useSelector(
    (state: RootState) => state.schedule
  );

  const [showCreateForm, setShowCreateForm] = useState(false);
  const [openEditForm, setopenEditForm] = useState(false);
  const [selectedSchedule, setSelectedSchedule] = useState(null);

  const handleEditSchedule = (schedule: any) => {
    setSelectedSchedule(schedule);
    setopenEditForm(true);
  };

  const [searchQuery, setSearchQuery] = useState("");
  const filteredStudents = searchQuery
    ? students.filter((student: any) =>
        student.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : students;

  const [selectedStudents, setSelectedStudents] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const handleStudentSelect = (studentId: string) => {
    setSelectedStudents((prev) =>
      prev.includes(studentId)
        ? prev.filter((id) => id !== studentId)
        : [...prev, studentId]
    );
  };

  useEffect(() => {
    dispatch(getAllSchedules());
    dispatch(getTeachers());
    dispatch(getStudents());
  }, [dispatch]);

  return (
    <div className="p-6 bg-gray-50 ">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-2">
            <MdSchedule className="text-blue-600" />
            Schedules Management
          </h1>
          <p className="text-gray-600 mt-1">
            Manage class schedules and student assignments
          </p>
        </div>
        <button
          onClick={() => setShowCreateForm(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg flex items-center gap-2 transition-colors duration-200 cursor-pointer"
        >
          <MdAdd className="text-lg" />
          Create Schedule
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
          <div className="text-2xl font-bold text-blue-600">
            {schedules?.length || 0}
          </div>
          <div className="text-sm text-gray-600">Total Schedules</div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
          <div className="text-2xl font-bold text-green-600">
            {schedules?.filter((s) => s.isActive).length || 0}
          </div>
          <div className="text-sm text-gray-600">Active Schedules</div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
          <div className="text-2xl font-bold text-purple-600">
            {teachers?.length || 0}
          </div>
          <div className="text-sm text-gray-600">Teachers</div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
          <div className="text-2xl font-bold text-orange-600">
            {students?.length || 0}
          </div>
          <div className="text-sm text-gray-600">Students</div>
        </div>
      </div>

      <TableSchedules
        teachers={teachers}
        schedules={schedules}
        schedulesLoading={schedulesLoading}
        dispatch={dispatch}
        handleEditSchedule={handleEditSchedule}
      />

      {showCreateForm && (
        <CreateSchedule
          teachers={teachers}
          students={students}
          dispatch={dispatch}
          setShowCreateForm={setShowCreateForm}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          filteredStudents={filteredStudents}
          selectedStudents={selectedStudents}
          setSelectedStudents={setSelectedStudents}
          isSubmitting={isSubmitting}
          setIsSubmitting={setIsSubmitting}
          handleStudentSelect={handleStudentSelect}
        />
      )}

      {openEditForm && (
        <UpdateSchedule
          teachers={teachers}
          setOpenEditForm={setopenEditForm}
          dispatch={dispatch}
          selectedStudents={selectedStudents}
          isSubmitting={isSubmitting}
          handleStudentSelect={handleStudentSelect}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          filteredStudents={filteredStudents}
          selectedSchedule={selectedSchedule}
          setSelectedSchedule={setSelectedSchedule}
        />
      )}
    </div>
  );
};

export default Schedules;
