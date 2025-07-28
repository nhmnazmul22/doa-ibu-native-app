import { configureStore } from "@reduxjs/toolkit";
import userReducer from "@/store/userSlice";
import doasReducer from "@/store/doasSlice"

export const store = configureStore({
  reducer: {
    user: userReducer,
    doas: doasReducer,
  },
});

// Types for use in components
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
