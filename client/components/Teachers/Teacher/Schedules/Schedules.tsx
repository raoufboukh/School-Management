import { MdCalendarToday } from "react-icons/md";

const Schedules = ({ classSchedules }: any) => {
  const getDayIndex = (day: string) => {
    const days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    return days.indexOf(day);
  };
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-gray-800">Weekly Schedule</h3>

      {classSchedules.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {classSchedules
            .sort(
              (a: any, b: any) =>
                getDayIndex(a.dayOfWeek) - getDayIndex(b.dayOfWeek)
            )
            .map((schedule: any) => (
              <div
                key={schedule._id}
                className="border border-gray-200 rounded-lg p-6"
              >
                <div className="flex items-center justify-between mb-4">
                  <h4 className="font-semibold text-gray-800">
                    {schedule.subject}
                  </h4>
                  <MdCalendarToday className="text-gray-500" />
                </div>

                <div className="space-y-2 text-sm text-gray-600">
                  <div className="flex justify-between">
                    <span>Day:</span>
                    <span className="font-medium">{schedule.dayOfWeek}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Time:</span>
                    <span className="font-medium">
                      {schedule.startTime} - {schedule.endTime}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Classroom:</span>
                    <span className="font-medium">{schedule.classroom}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Students:</span>
                    <span className="font-medium">
                      {schedule.studentsCount}
                    </span>
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-gray-200">
                  <button className="w-full text-center text-primary hover:text-primary/80 text-sm font-medium">
                    View Class Details
                  </button>
                </div>
              </div>
            ))}
        </div>
      ) : (
        <div className="text-center py-8 text-gray-500">
          <MdCalendarToday className="mx-auto text-4xl mb-2" />
          <p>No scheduled classes found</p>
        </div>
      )}
    </div>
  );
};

export default Schedules;
