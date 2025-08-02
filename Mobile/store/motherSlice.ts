import api from "@/lib/config/axios";
import { Mother } from "@/types";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Response {
  message: string;
  data: Mother;
}

interface InitialState {
  items?: Response;
  loading: boolean;
  error: string | null;
}

const initialState: InitialState = {
  items: {
    message: "",
    data: {
      email: "",
      fullName: "",
    },
  },
  loading: false,
  error: null,
};

export const fetchMother = createAsyncThunk<Response, string>(
  "mother/fetchMother",
  async (email) => {
    const response = await api.get(`/get-mother/${email}`);
    return response.data;
  }
);

const motherSlice = createSlice({
  name: "mother",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMother.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchMother.fulfilled,
        (state, action: PayloadAction<Response>) => {
          state.loading = false;
          state.items = action.payload;
        }
      )
      .addCase(fetchMother.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? "Something went wrong";
      });
  },
});

export default motherSlice.reducer;
