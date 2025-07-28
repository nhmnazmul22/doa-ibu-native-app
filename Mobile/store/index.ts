import { configureStore } from "@reduxjs/toolkit";
import userReducer from "@/store/userSlice";
import usersReducer from "@/store/allUserSlice";
import userByIdReducer from "@/store/userIdSlice";
import doasReducer from "@/store/doasSlice";
import doaReducer from "@/store/doaSlice";
import doaByMotherReducer from "@/store/doasbyMother";
import mothersReducer from "@/store/mothersSlice";
import motherByEmailReducer from "@/store/motherSlice";
import motherByIdReducer from "@/store/motherIdSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    users: usersReducer,
    userById: userByIdReducer,
    doas: doasReducer,
    doa: doaReducer,
    doasByMother: doaByMotherReducer,
    mothers: mothersReducer,
    mother: motherByEmailReducer,
    motherById: motherByIdReducer,
  },
});

// Types for use in components
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
