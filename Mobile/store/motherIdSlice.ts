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

export const fetchMotherById = createAsyncThunk<Response, string>(
  "mother/fetchMother",
  async (motherId) => {
    const response = await api.get(`/get-mother-by-id/${motherId}`);
    return response.data;
  }
);

const motherSlice = createSlice({
  name: "mother",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMotherById.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.items = initialState.items;
      })
      .addCase(
        fetchMotherById.fulfilled,
        (state, action: PayloadAction<Response>) => {
          state.loading = false;
          state.items = action.payload;
        }
      )
      .addCase(fetchMotherById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? "Something went wrong";
        state.items = initialState.items;
      });
  },
});

export default motherSlice.reducer;
