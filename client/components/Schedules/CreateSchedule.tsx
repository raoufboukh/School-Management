import { createSchedule, getAllSchedules } from "@/redux/slices/ScheduleSlice";
import { useState } from "react";
import { MdClose, MdSearch } from "react-icons/md";
import { daysOfWeek, subjects } from "../constants";

const CreateSchedule = ({
  teachers,
  dispatch,
  setShowCreateForm,
  selectedStudents,
  setSelectedStudents,
  isSubmitting,
  setIsSubmitting,
  handleStudentSelect,
  searchQuery,
  setSearchQuery,
  filteredStudents,
}: any) => {
  const [formData, setFormData] = useState({
    studentIds: [] as string[],
    teacherId: "",
    subject: "",
    dayOfWeek: "",
    startTime: "",
    endTime: "",
    classroom: "",
  });

  const handleCreateSchedule = async (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedStudents.length === 0) {
      alert("Please select at least one student");
      return;
    }

    setIsSubmitting(true);
    try {
      await dispatch(
        createSchedule({
          ...formData,
          studentIds: selectedStudents,
        })
      ).unwrap();

      setFormData({
        studentIds: [],
        teacherId: "",
        subject: "",
        dayOfWeek: "",
        startTime: "",
        endTime: "",
        classroom: "",
      });
      setSelectedStudents([]);
      setShowCreateForm(false);

      dispatch(getAllSchedules());
      alert("Schedule created successfully!");
    } catch (error: any) {
      alert(error.message || "Error creating schedule");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/80 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-gray-200">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold text-gray-800">
              Create New Schedule
            </h2>
            <button
              onClick={() => setShowCreateForm(false)}
              className="text-gray-500 hover:text-gray-700 cursor-pointer"
            >
              <MdClose className="text-xl" />
            </button>
          </div>
        </div>

        <form onSubmit={handleCreateSchedule} className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Teacher *
              </label>
              <select
                value={formData.teacherId}
                onChange={(e) =>
                  setFormData({ ...formData, teacherId: e.target.value })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
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
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Subject *
              </label>
              <select
                value={formData.subject}
                onChange={(e) =>
                  setFormData({ ...formData, subject: e.target.value })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
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
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Day of Week *
              </label>
              <select
                value={formData.dayOfWeek}
                onChange={(e) =>
                  setFormData({ ...formData, dayOfWeek: e.target.value })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              >
                <option value="">Select Day</option>
                {daysOfWeek.map((day) => (
                  <option key={day} value={day}>
                    {day}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Start Time *
              </label>
              <input
                type="time"
                value={formData.startTime}
                onChange={(e) =>
                  setFormData({ ...formData, startTime: e.target.value })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                End Time *
              </label>
              <input
                type="time"
                value={formData.endTime}
                onChange={(e) =>
                  setFormData({ ...formData, endTime: e.target.value })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Classroom *
              </label>
              <input
                type="text"
                value={formData.classroom}
                onChange={(e) =>
                  setFormData({ ...formData, classroom: e.target.value })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="e.g., Room 101"
                required
              />
            </div>
          </div>

          <div className="mt-4">
            <div className="relative mb-4 md:w-56">
              <MdSearch className="absolute left-3 top-3.5 text-gray-400" />
              <input
                type="text"
                placeholder="Search Student..."
                className="border border-gray-300 rounded-lg pl-8 pr-2 py-2 mb-2 w-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Select Students * ({selectedStudents.length} selected)
            </label>
            <div className="max-h-40 overflow-y-auto border border-gray-300 rounded-lg p-3">
              {filteredStudents.map((student: any) => (
                <div key={student._id} className="flex items-center mb-2">
                  <input
                    type="checkbox"
                    id={`student-${student._id}`}
                    checked={selectedStudents.includes(student._id)}
                    onChange={() => handleStudentSelect(student._id)}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded mr-2"
                  />
                  <label
                    htmlFor={`student-${student._id}`}
                    className="text-sm text-gray-700"
                  >
                    {student.name} ({student.email})
                  </label>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-end gap-3 mt-6">
            <button
              type="button"
              onClick={() => setShowCreateForm(false)}
              className="px-4 py-2 text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors duration-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
            >
              {isSubmitting ? "Creating..." : "Create Schedule"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateSchedule;
