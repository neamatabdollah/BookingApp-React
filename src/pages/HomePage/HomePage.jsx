import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchBestOffers,
  fetchRecommendedHotels,
} from "../../store/hotelSlice";
import HotelCard from "../../components/HotelCard/HotelCard";
import { useNavigate } from "react-router-dom";
import Loader from "../../components/Loader/Loader";

function HomePage() {
  // navigate to search page
  const navigate = useNavigate();
  const handleSearchHotels = () => {
    navigate("/hotels");
  };

  /////////////////
  const dispatch = useDispatch();
  const {
    bestOffers,
    recommendedHotels,
    bestOffersStatus,
    recommendedStatus,
    error,
  } = useSelector((state) => state.hotels);

  // get user data from register page
  const user = useSelector((state) => state.user.user);

  useEffect(() => {
    dispatch(fetchBestOffers());
    dispatch(fetchRecommendedHotels());
  }, [dispatch]);

  return (
    <div className="container mt-4">
      {user && (
        <h4 className="mb-4">
          Welcome, <span className="text-primary">{user.name}</span>! 🎉
        </h4>
      )}{" "}

      <button className="btn btn-primary mb-4" onClick={handleSearchHotels}>
        🔍 Search Hotels
      </button>
      <h2>Best Offers</h2>
      <div className="d-flex flex-wrap gap-3">
        {bestOffersStatus === "loading" && <Loader/>}
        {bestOffersStatus === "succeeded" &&
          bestOffers.map((hotel) => <HotelCard key={hotel.id} hotel={hotel} />)}
      </div>
      <h2 className="mt-5">Recommended Hotels</h2>
      <div className="d-flex flex-wrap gap-3">
        {recommendedStatus === "loading" && <Loader/>}
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
