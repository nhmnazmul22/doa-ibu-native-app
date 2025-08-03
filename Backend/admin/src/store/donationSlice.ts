import api from "@/lib/axios";
import { Donation } from "@/types";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Response {
  message: string;
  data: Donation[];
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

export const fetchDonations = createAsyncThunk<Response>(
  "donation/fetchDonations",
  async () => {
    const response = await api.get(`/get-all-donations`);
    return response.data;
  }
);

const donationSlice = createSlice({
  name: "donation",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchDonations.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.items = {
          message: "",
          data: [],
        };
      })
      .addCase(
        fetchDonations.fulfilled,
        (state, action: PayloadAction<Response>) => {
          state.loading = false;
          state.items = action.payload;
        }
      )
      .addCase(fetchDonations.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? "Something went wrong";
        state.items = {
          message: "",
          data: [],
        };
      });
  },
});

export default donationSlice.reducer;
