import api from "@/lib/config/axios";
import { Mother } from "@/types";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Response {
  message: string;
  data: Mother[];
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

export const fetchMothers = createAsyncThunk<Response>(
  "mother/fetchMothers",
  async () => {
    const response = await api.get(`/get-all-mothers`);
    return response.data;
  }
);

const mothersSlice = createSlice({
  name: "mothers",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMothers.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.items = initialState.items;
      })
      .addCase(
        fetchMothers.fulfilled,
        (state, action: PayloadAction<Response>) => {
          state.loading = false;
          state.items = action.payload;
        }
      )
      .addCase(fetchMothers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? "Something went wrong";
        state.items = initialState.items;
      });
  },
});

export default mothersSlice.reducer;
