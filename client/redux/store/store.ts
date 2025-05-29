import { configureStore } from "@reduxjs/toolkit";
import { authSlice } from "../slices/AuthSlice";
import { schoolSlice } from "../slices/schoolSlice";

export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    school: schoolSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
