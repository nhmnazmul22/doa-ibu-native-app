import { configureStore } from "@reduxjs/toolkit";
import userReducer from "@/store/userSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
  },
});

// Types for use in components
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
