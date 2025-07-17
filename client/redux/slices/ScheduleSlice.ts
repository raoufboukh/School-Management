import { axiosInstance } from "@/lib/axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const createSchedule = createAsyncThunk(
  "schedule/createSchedule",
  async (scheduleData: any, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("/api/schedules", scheduleData);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getAllSchedules = createAsyncThunk(
  "schedule/getAllSchedules",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get("/api/schedules/all");
      return response.data.schedules;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getStudentSchedule = createAsyncThunk(
  "schedule/getStudentSchedule",
  async (studentId: string, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(
        `/api/schedules/student/${studentId}`
      );
      return response.data.schedules;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getTeacherSchedule = createAsyncThunk(
  "schedule/getTeacherSchedule",
  async (teacherId: string, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(
        `/api/schedules/teacher/${teacherId}`
      );
      return response.data.teacherSchedules;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const addStudentsToSchedule = createAsyncThunk(
  "schedule/addStudentsToSchedule",
  async (
    data: { scheduleId: string; studentIds: string[] },
    { rejectWithValue }
  ) => {
    try {
      const response = await axiosInstance.put(
        `/api/schedules/${data.scheduleId}/add-students`,
        { studentIds: data.studentIds }
      );
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const removeStudentsFromSchedule = createAsyncThunk(
  "schedule/removeStudentsFromSchedule",
  async (
    data: { scheduleId: string; studentIds: string[] },
    { rejectWithValue }
  ) => {
    try {
      const response = await axiosInstance.put(
        `/api/schedules/${data.scheduleId}/remove-students`,
        { studentIds: data.studentIds }
      );
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateSchedule = createAsyncThunk(
  "schedule/updateSchedule",
  async (scheduleData: any, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.put(
        `/api/schedules/${scheduleData._id}`,
        scheduleData
      );
      return response.data.schedule;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const deleteSchedule = createAsyncThunk(
  "schedule/deleteSchedule",
  async (id: string, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.delete(`/api/schedules/${id}`);
      return data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

interface ScheduleState {
  schedules: any[];
  studentSchedules: any[];
  teacherSchedules: any[];
  loading: boolean;
  error: any | null;
}

const initialState: ScheduleState = {
  schedules: [],
  studentSchedules: [],
  teacherSchedules: [],
  loading: false,
  error: null,
};

export const scheduleSlice = createSlice({
  name: "schedule",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(createSchedule.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createSchedule.fulfilled, (state, action: any) => {
        state.loading = false;
        state.schedules.push(action.payload);
      })
      .addCase(createSchedule.rejected, (state: any, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getAllSchedules.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllSchedules.fulfilled, (state, action) => {
        state.loading = false;
        state.schedules = action.payload;
      })
      .addCase(getAllSchedules.rejected, (state: any, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getStudentSchedule.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getStudentSchedule.fulfilled, (state, action) => {
        state.loading = false;
        state.studentSchedules = action.payload;
      })
      .addCase(getStudentSchedule.rejected, (state: any, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getTeacherSchedule.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getTeacherSchedule.fulfilled, (state, action) => {
        state.loading = false;
        state.teacherSchedules = action.payload;
      })
      .addCase(getTeacherSchedule.rejected, (state: any, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateSchedule.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateSchedule.fulfilled, (state, action) => {
        const index = state.schedules.findIndex(
          (schedule: any) => schedule._id === action.payload._id
        );
        if (index !== -1) {
          state.schedules[index] = action.payload;
          const studentIndex = state.studentSchedules.findIndex(
            (schedule: any) => schedule._id === action.payload._id
          );
          if (studentIndex !== -1) {
            state.studentSchedules[studentIndex] = action.payload;
          }
          const teacherIndex = state.teacherSchedules.findIndex(
            (schedule: any) => schedule._id === action.payload._id
          );
          if (teacherIndex !== -1) {
            state.teacherSchedules[teacherIndex] = action.payload;
          }
        }
        state.loading = false;
        state.error = null;
      })
      .addCase(addStudentsToSchedule.rejected, (state: any, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(addStudentsToSchedule.pending, (state: any, action) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addStudentsToSchedule.fulfilled, (state: any, action) => {
        state.loading = false;
        const updatedSchedule = action.payload.schedule;
        const index = state.schedules.findIndex(
          (schedule: any) => schedule._id === updatedSchedule._id
        );
        if (index !== -1) {
          state.schedules[index] = updatedSchedule;
          const studentIndex = state.studentSchedules.findIndex(
            (schedule: any) => schedule._id === updatedSchedule._id
          );
          if (studentIndex !== -1) {
            state.studentSchedules[studentIndex] = updatedSchedule;
          }
          const teacherIndex = state.teacherSchedules.findIndex(
            (schedule: any) => schedule._id === updatedSchedule._id
          );
          if (teacherIndex !== -1) {
            state.teacherSchedules[teacherIndex] = updatedSchedule;
          }
        }
      })
      .addCase(updateSchedule.rejected, (state: any, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteSchedule.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteSchedule.fulfilled, (state, action) => {
        state.loading = false;
        state.schedules = state.schedules.filter(
          (schedule: any) => schedule._id !== action.payload._id
        );
        state.studentSchedules = state.studentSchedules.filter(
          (schedule: any) => schedule._id !== action.payload._id
        );
        state.teacherSchedules = state.teacherSchedules.filter(
          (schedule: any) => schedule._id !== action.payload._id
        );
      })
      .addCase(deleteSchedule.rejected, (state: any, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default scheduleSlice.reducer;
