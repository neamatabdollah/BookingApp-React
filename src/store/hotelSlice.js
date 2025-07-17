import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../network/axios";

export const fetchHotels = createAsyncThunk("hotels/fetchHotels", async () => {
  const response = await axios.get("/hotels");
  return response.data;
});

const hotelSlice = createSlice({
  name: "hotels",
  initialState: {
    hotels: [],
    status: "idle",
    error: null,
  },
  reducers: {
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchHotels.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchHotels.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.hotels = action.payload;
      })
      .addCase(fetchHotels.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default hotelSlice.reducer;
