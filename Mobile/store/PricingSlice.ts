import api from "@/lib/config/axios";
import { Pricing, User } from "@/types";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Response {
  message: string;
  data: Pricing[];
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

export const fetchPricing = createAsyncThunk<Response>(
  "pricing/fetchPricing",
  async () => {
    const response = await api.get(`/get-pricing`);
    return response.data;
  }
);

const pricingSlice = createSlice({
  name: "pricing",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPricing.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.items = initialState.items;
      })
      .addCase(
        fetchPricing.fulfilled,
        (state, action: PayloadAction<Response>) => {
          state.loading = false;
          state.items = action.payload;
        }
      )
      .addCase(fetchPricing.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? "Something went wrong";
        state.items = initialState.items;
      });
  },
});

export default pricingSlice.reducer;
