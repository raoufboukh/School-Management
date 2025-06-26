const StudentsCount = ({ filteredStudents }: any) => {
  return (
    filteredStudents.length > 0 && (
      <div className="grid grid-cols-4 gap-4 my-6">
        {[
          {
            field: "PRIMARY",
            color: "bg-purple-50 text-purple-800",
            count: filteredStudents.filter((s: any) => s.fields === "PRIMARY")
              .length,
          },
          {
            field: "CEM",
            color: "bg-green-50 text-green-800",
            count: filteredStudents.filter((s: any) => s.fields === "CEM")
              .length,
          },
          {
            field: "LICEE",
            color: "bg-blue-50 text-blue-800",
            count: filteredStudents.filter((s: any) => s.fields === "LICEE")
              .length,
          },
          {
            field: "Total",
            color: "bg-gray-50 text-gray-800",
            count: filteredStudents.length,
          },
        ].map((item, index) => (
          <div
            key={index}
            className={`p-4 rounded-lg flex flex-col items-center ${item.color}`}
          >
            <div className="text-2xl font-bold">{item.count}</div>
            <div className="text-sm font-medium">{item.field} Student</div>
          </div>
        ))}
      </div>
    )
  );
};

export default StudentsCount;
