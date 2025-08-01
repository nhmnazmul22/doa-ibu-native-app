import { configureStore } from "@reduxjs/toolkit";
import usersReducer from "@/store/allUserSlice";
import motherReducer from "@/store/mothersSlice";
import doasReducer from "@/store/doasSlice";
import subscriptionReducer from "@/store/subscriptionSlice";
import donationReducer from "@/store/donationSlice";
import pricingSlice from "@/store/PricingSlice";

export const store = configureStore({
  reducer: {
    users: usersReducer,
    mothers: motherReducer,
    doas: doasReducer,
    subscriptions: subscriptionReducer,
    donations: donationReducer,
    pricing: pricingSlice,
  },
});

// Types for use in components
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
