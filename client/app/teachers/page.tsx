"use client";
import { useState, useEffect } from "react";
import { MdAdd, MdSearch, MdSchool } from "react-icons/md";
import { getTeachers } from "@/redux/slices/schoolSlice";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store/store";
import FilterTeachers from "@/components/Teachers/FilterTeachers";
import TeachersCount from "@/components/Teachers/TeachersCount";

interface Teacher {
  _id: string;
  name: string;
  email: string;
  number?: string;
  subject: string;
  subjects?: string[];
  role: string;
  createdAt: string;
}

const Teachers = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { teachers, loading } = useSelector((state: RootState) => state.school);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredTeachers, setFilteredTeachers] = useState<Teacher[]>([]);

  useEffect(() => {
    dispatch(getTeachers());
  }, [dispatch]);

  useEffect(() => {
    if (teachers) {
      const filtered = teachers.filter(
        (teacher) =>
          teacher.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          teacher.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
          teacher.subject?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          teacher.subjects?.some((sub: string) =>
            sub.toLowerCase().includes(searchTerm.toLowerCase())
          )
      );
      setFilteredTeachers(filtered);
    }
  }, [teachers, searchTerm]);

  const getTeacherSubjects = (teacher: Teacher) => {
    if (teacher.subjects && teacher.subjects.length > 0) {
      return teacher.subjects;
    }
    return teacher.subject ? [teacher.subject] : [];
  };

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
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">All Teachers</h2>
          <p className="text-gray-600 mt-1">
            Total: {filteredTeachers.length} teacher
            {filteredTeachers.length !== 1 ? "s" : ""}
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
              placeholder="Search teachers by name, email, or subject..."
            />
          </div>

          <Link href="/teachers/add">
            <button className="bg-primary hover:bg-primary/90 text-white px-4 py-2.5 rounded-lg flex items-center gap-2 transition-colors duration-300 font-medium">
              <MdAdd className="text-lg" />
              Add Teacher
            </button>
          </Link>
        </div>
      </div>
      <TeachersCount
        filteredTeachers={filteredTeachers}
        getTeacherSubjects={getTeacherSubjects}
        teachers={teachers}
      />

      {filteredTeachers.length === 0 ? (
        <div className="text-center py-12">
          <MdSchool className="mx-auto text-6xl text-gray-400 mb-4" />
          <h3 className="text-xl font-semibold text-gray-600 mb-2">
            {searchTerm ? "No teachers found" : "No teachers yet"}
          </h3>
          <p className="text-gray-500 mb-6">
            {searchTerm
              ? "Try adjusting your search terms"
              : "Start by adding your first teacher to the system"}
          </p>
          {!searchTerm && (
            <Link href="/teachers/add">
              <button className="bg-primary hover:bg-primary/90 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-300">
                Add First Teacher
              </button>
            </Link>
          )}
        </div>
      ) : (
        <FilterTeachers
          filteredTeachers={filteredTeachers}
          getTeacherSubjects={getTeacherSubjects}
        />
      )}
    </div>
  );
};

export default Teachers;
