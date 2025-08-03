import api from "@/lib/axios";
import { Subscription, User } from "@/types";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Response {
  message: string;
  data: Subscription[];
}

interface InitialState {
  items?: Response;
  loading: boolean;
  error: string | null;
}

const initialState: InitialState = {
  items: {
    message: "",
    data: [],
  },
  loading: false,
  error: null,
};

export const fetchSubscriptions = createAsyncThunk<Response>(
  "subscription/fetchSubscriptions",
  async () => {
    const response = await api.get(`/get-all-subscription`);
    return response.data;
  }
);

const subscriptionSlice = createSlice({
  name: "subscription",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSubscriptions.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.items = {
          message: "",
          data: [],
        };
      })
      .addCase(
        fetchSubscriptions.fulfilled,
        (state, action: PayloadAction<Response>) => {
          state.loading = false;
          state.items = action.payload;
        }
      )
      .addCase(fetchSubscriptions.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? "Something went wrong";
        state.items = {
          message: "",
          data: [],
        };
      });
  },
});

export default subscriptionSlice.reducer;
