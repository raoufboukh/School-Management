import { configureStore } from "@reduxjs/toolkit";
import { authSlice } from "../slices/AuthSlice";
import { schoolSlice } from "../slices/schoolSlice";
import { scheduleSlice } from "../slices/ScheduleSlice";

export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    school: schoolSlice.reducer,
    schedule: scheduleSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
