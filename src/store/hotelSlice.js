import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../network/axios";

//all Hotels
export const fetchHotels = createAsyncThunk("hotels/fetchHotels", async () => {
  const response = await axios.get("/hotels");
  return response.data;
});

// best offers
export const fetchBestOffers = createAsyncThunk(
  "hotels/fetchBestOffers",
  async () => {
    const response = await axios.get("/best_offer");
    return response.data;
  }
);

// recommended hotels
export const fetchRecommendedHotels = createAsyncThunk(
  "hotels/fetchRecommendedHotels",
  async () => {
    const response = await axios.get("/recommended_hotels");
    return response.data;
  }
);

const hotelSlice = createSlice({
  name: "hotels",
  initialState: {
    hotels: [],
    bestOffers: [],
    recommendedHotels: [],
    status: "idle",
    bestOffersStatus: "idle",
    recommendedStatus: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    //all hotels
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

    // best offers
    builder
      .addCase(fetchBestOffers.pending, (state) => {
        state.bestOffersStatus = "loading";
      })
      .addCase(fetchBestOffers.fulfilled, (state, action) => {
        state.bestOffersStatus = "succeeded";
        state.bestOffers = action.payload;
      })
      .addCase(fetchBestOffers.rejected, (state, action) => {
        state.bestOffersStatus = "failed";
        state.error = action.error.message;
      });

    // recommended hotels
    builder
      .addCase(fetchRecommendedHotels.pending, (state) => {
        state.recommendedStatus = "loading";
      })
      .addCase(fetchRecommendedHotels.fulfilled, (state, action) => {
        state.recommendedStatus = "succeeded";
        state.recommendedHotels = action.payload;
      })
      .addCase(fetchRecommendedHotels.rejected, (state, action) => {
        state.recommendedStatus = "failed";
        state.error = action.error.message;
      });
  },
});

export default hotelSlice.reducer;
