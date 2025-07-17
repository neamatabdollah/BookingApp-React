import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchBestOffers,
  fetchRecommendedHotels,
} from "../../store/hotelSlice";
import HotelCard from "../../components/HotelCard/HotelCard";

function HomePage() {
  const dispatch = useDispatch();
  const {
    bestOffers,
    recommendedHotels,
    bestOffersStatus,
    recommendedStatus,
    error,
  } = useSelector((state) => state.hotels);

  useEffect(() => {
    dispatch(fetchBestOffers());
    dispatch(fetchRecommendedHotels());
  }, [dispatch]);

  return (
    <div className="container mt-4">
      <h2>Best Offers</h2>
      <div className="d-flex flex-wrap gap-3">
        {bestOffersStatus === "loading" && <p>Loading...</p>}
        {bestOffersStatus === "succeeded" &&
          bestOffers.map((hotel) => <HotelCard key={hotel.id} hotel={hotel} />)}
      </div>

      <h2 className="mt-5">Recommended Hotels</h2>
      <div className="d-flex flex-wrap gap-3">
        {recommendedStatus === "loading" && <p>Loading...</p>}
        {recommendedStatus === "succeeded" &&
          recommendedHotels.map((hotel) => (
            <HotelCard key={hotel.id} hotel={hotel} />
          ))}
      </div>

      {error && <p className="text-danger">{error}</p>}
    </div>
  );
}

export default HomePage;
