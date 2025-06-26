"use client";
import { useState, useEffect } from "react";
import { MdAdd, MdSearch, MdPerson } from "react-icons/md";
import { getStudents } from "@/redux/slices/schoolSlice";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store/store";
import FilterStudents from "@/components/Students/FilterStudents";
import StudentsCount from "@/components/Students/StudentsCount";

interface Student {
  _id: string;
  name: string;
  email: string;
  number?: string;
  fields: "PRIMARY" | "CEM" | "LICEE";
  role: string;
  createdAt: string;
}

const Students = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { students, loading } = useSelector((state: RootState) => state.school);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredStudents, setFilteredStudents] = useState<Student[]>([]);

  useEffect(() => {
    dispatch(getStudents());
  }, [dispatch]);

  useEffect(() => {
    if (students) {
      const filtered = students.filter(
        (student: Student) =>
          student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          student.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
          student.fields.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredStudents(filtered);
    }
  }, [students, searchTerm]);

  if (loading) {
    return (
      <div className="rounded-md bg-white p-6">
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-md bg-white p-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">All Students</h2>
          <p className="text-gray-600 mt-1">
            Total: {filteredStudents.length} student
            {filteredStudents.length !== 1 ? "s" : ""}
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="relative flex items-center">
            <MdSearch className="text-gray-500 absolute left-3 top-1/2 transform -translate-y-1/2" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-80 border border-gray-300 rounded-lg pl-10 pr-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200"
              placeholder="Search students by name, email, or field..."
            />
          </div>

          <Link href="/students/add">
            <button className="bg-primary hover:bg-primary/90 text-white px-4 py-2.5 rounded-lg flex items-center gap-2 transition-colors duration-300 font-medium">
              <MdAdd className="text-lg" />
              Add Student
            </button>
          </Link>
        </div>
      </div>

      <StudentsCount filteredStudents={filteredStudents} />

      {filteredStudents.length === 0 ? (
        <div className="text-center py-12">
          <MdPerson className="mx-auto text-6xl text-gray-400 mb-4" />
          <h3 className="text-xl font-semibold text-gray-600 mb-2">
            {searchTerm ? "No students found" : "No students yet"}
          </h3>
          <p className="text-gray-500 mb-6">
            {searchTerm
              ? "Try adjusting your search terms"
              : "Start by adding your first student to the system"}
          </p>
          {!searchTerm && (
            <Link href="/students/add">
              <button className="bg-primary hover:bg-primary/90 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-300">
                Add First Student
              </button>
            </Link>
          )}
        </div>
      ) : (
        <FilterStudents filteredStudents={filteredStudents} />
      )}
    </div>
  );
};

export default Students;
