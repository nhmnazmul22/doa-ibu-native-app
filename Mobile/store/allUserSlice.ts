import api from "@/lib/config/axios";
import { User } from "@/types";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Response {
  message: string;
  data: User[];
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

export const fetchAllUser = createAsyncThunk<Response>(
  "user/fetchAllUser",
  async () => {
    const response = await api.get(`/get-all-users`);
    return response.data;
  }
);

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllUser.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.items = {
          message: "",
          data: [],
        };
      })
      .addCase(
        fetchAllUser.fulfilled,
        (state, action: PayloadAction<Response>) => {
          state.loading = false;
          state.items = action.payload;
        }
      )
      .addCase(fetchAllUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? "Something went wrong";
        state.items = {
          message: "",
          data: [],
        };
      });
  },
});

export default usersSlice.reducer;
