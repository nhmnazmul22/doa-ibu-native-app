import api from "@/lib/axios";
import { Doa, User } from "@/types";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Response {
  message: string;
  data: Doa[];
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

export const fetchDoas = createAsyncThunk<Response>(
  "doa/fetchDoas",
  async () => {
    const response = await api.get(`/get-daos/uploaded`);
    return response.data;
  }
);

const doasSlice = createSlice({
  name: "doas",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchDoas.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.items = {
          message: "",
          data: [],
        };
      })
      .addCase(
        fetchDoas.fulfilled,
        (state, action: PayloadAction<Response>) => {
          state.loading = false;
          state.items = action.payload;
        }
      )
      .addCase(fetchDoas.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? "Something went wrong";
        state.items = {
          message: "",
          data: [],
        };
      });
  },
});

export default doasSlice.reducer;
