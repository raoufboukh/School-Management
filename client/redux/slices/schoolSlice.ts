import { axiosInstance } from "@/lib/axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const getStudents = createAsyncThunk(
  "school/getStudents",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.get("/api/school/students");
      return data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getStudent = createAsyncThunk(
  "school/getStudent",
  async (studentId: string, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.get(
        `/api/school/students/${studentId}`
      );
      return data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const addStudent = createAsyncThunk(
  "school/addStudent",
  async (studentData: any, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.post(
        "/api/school/add-student",
        studentData
      );
      return data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getTeachers = createAsyncThunk(
  "school/getTeachers",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.get("/api/school/teachers");
      return data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getTeacher = createAsyncThunk(
  "school/getTeacher",
  async (teacherId: string, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.get(
        `/api/school/teachers/${teacherId}`
      );
      return data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const addTeacher = createAsyncThunk(
  "school/addTeacher",
  async (teacherData: any, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.post(
        "/api/school/add-teacher",
        teacherData
      );
      return data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const processSubjectPayment = createAsyncThunk(
  "school/processSubjectPayment",
  async (paymentData: any, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.post(
        "/api/school/payment",
        paymentData
      );
      return data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getStudentPayments = createAsyncThunk(
  "school/getStudentPayments",
  async (studentId: string, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.get(
        `/api/school/payments/student/${studentId}`
      );
      return data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getPaymentHistory = createAsyncThunk(
  "school/getPaymentHistory",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.get("/api/school/payments/history");
      return data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const markAttendance = createAsyncThunk(
  "school/markAttendance",
  async (attendanceData: any, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.post(
        "/api/school/attendance",
        attendanceData
      );
      return data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getSubjectSessionHistory = createAsyncThunk(
  "school/getSubjectSessionHistory",
  async (queryParams: any, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.get(
        "/api/school/attendance/history",
        {
          params: queryParams,
        }
      );
      return data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getStudentReport = createAsyncThunk(
  "school/getStudentReport",
  async (studentId: string, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.get(
        `/api/school/report/student/${studentId}`
      );
      return data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getTeacherStudents = createAsyncThunk(
  "school/getTeacherStudents",
  async (teacherId: string, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.get(
        `/api/school/teachers/${teacherId}/students`
      );
      return data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

interface SchoolState {
  teachers: any[];
  students: any[];
  student: any | null;
  teacher: any | null;
  teacherStudents: any[];
  teacherStudentsLoading: boolean;
  payments: any[];
  paymentHistory: any[];
  attendance: any[];
  sessionHistory: any[];
  studentReport: any;
  loading: boolean;
  error: any;
}

const initialState: SchoolState = {
  teachers: [],
  students: [],
  student: null,
  teacher: null,
  teacherStudents: [],
  teacherStudentsLoading: false,
  payments: [],
  paymentHistory: [],
  attendance: [],
  sessionHistory: [],
  studentReport: null,
  loading: false,
  error: null,
};

export const schoolSlice = createSlice({
  name: "school",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getStudents.pending, (state) => {
        state.loading = true;
      })
      .addCase(getStudents.fulfilled, (state, action) => {
        state.loading = false;
        state.students = action.payload.students;
      })
      .addCase(getStudents.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getStudent.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getStudent.fulfilled, (state, action) => {
        state.loading = false;
        state.student = action.payload.student;
      })
      .addCase(getStudent.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(addStudent.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addStudent.fulfilled, (state, action) => {
        state.loading = false;
        state.students.push(action.payload.student);
      })
      .addCase(addStudent.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getTeachers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getTeachers.fulfilled, (state, action) => {
        state.loading = false;
        state.teachers = action.payload.teachers;
      })
      .addCase(getTeachers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getTeacher.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getTeacher.fulfilled, (state, action) => {
        state.loading = false;
        state.teacher = action.payload.teacher;
      })
      .addCase(getTeacher.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(addTeacher.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addTeacher.fulfilled, (state, action) => {
        state.loading = false;
        state.teachers.push(action.payload);
      })
      .addCase(addTeacher.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(processSubjectPayment.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(processSubjectPayment.fulfilled, (state, action) => {
        state.loading = false;
        state.payments.push(action.payload);
      })
      .addCase(processSubjectPayment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(getStudentPayments.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getStudentPayments.fulfilled, (state, action) => {
        state.loading = false;
        state.payments = action.payload.payments;
      })
      .addCase(getStudentPayments.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(getPaymentHistory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getPaymentHistory.fulfilled, (state, action) => {
        state.loading = false;
        state.paymentHistory = action.payload.history;
      })
      .addCase(getPaymentHistory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(markAttendance.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(markAttendance.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(markAttendance.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(getSubjectSessionHistory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getSubjectSessionHistory.fulfilled, (state, action) => {
        state.loading = false;
        state.sessionHistory = action.payload.history;
      })
      .addCase(getSubjectSessionHistory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getStudentReport.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getStudentReport.fulfilled, (state, action) => {
        state.loading = false;
        state.studentReport = action.payload.report;
      })
      .addCase(getStudentReport.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getTeacherStudents.pending, (state) => {
        state.teacherStudentsLoading = true;
        state.error = null;
      })
      .addCase(getTeacherStudents.fulfilled, (state, action) => {
        state.teacherStudentsLoading = false;
        state.teacherStudents = action.payload.students;
      })
      .addCase(getTeacherStudents.rejected, (state, action) => {
        state.teacherStudentsLoading = false;
        state.error = action.payload;
      });
  },
});

export default schoolSlice.reducer;
