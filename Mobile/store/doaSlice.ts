import api from "@/lib/config/axios";
import { Doa } from "@/types";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Response {
  message: string;
  data: Doa;
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
      title: "",
      shortDes: "",
    },
  },
  loading: false,
  error: null,
};

export const fetchDoa = createAsyncThunk<Response, string>(
  "doa/fetchDoa",
  async (param) => {
    const response = await api.get(`/get-doa/${param}`);
    return response.data;
  }
);

const doaSlice = createSlice({
  name: "doa",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchDoa.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.items = {
          message: "",
          data: {
            title: "",
            shortDes: "",
          },
        };
      })
      .addCase(fetchDoa.fulfilled, (state, action: PayloadAction<Response>) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchDoa.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? "Something went wrong";
        state.items = {
          message: "",
          data: {
            title: "",
            shortDes: "",
          },
        };
      });
  },
});

export default doaSlice.reducer;
