import api from "@/lib/config/axios";
import { Doa } from "@/types";
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

export const fetchDoasByMotherId = createAsyncThunk<Response, string>(
  "doa/fetchDoasByMotherId",
  async (motherId) => {
    const response = await api.get(`/get-doas-by-motherId/${motherId}`);
    return response.data;
  }
);

const doaByMotherIdSlice = createSlice({
  name: "doasByMother",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchDoasByMotherId.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.items = {
          message: "",
          data: [],
        };
      })
      .addCase(
        fetchDoasByMotherId.fulfilled,
        (state, action: PayloadAction<Response>) => {
          state.loading = false;
          state.items = action.payload;
        }
      )
      .addCase(fetchDoasByMotherId.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? "Something went wrong";
        state.items = {
          message: "",
          data: [],
        };
      });
  },
});

export default doaByMotherIdSlice.reducer;
