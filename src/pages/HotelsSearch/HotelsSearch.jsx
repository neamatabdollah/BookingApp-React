import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchHotels } from "../../store/hotelSlice";
import HotelCard from "../../components/HotelCard/HotelCard";
import Loader from "../../components/Loader/Loader";

const countries = [
  { label: "United States", value: "US" },
  { label: "Morocco", value: "MA" },
  { label: "Egypt", value: "EG" },
  { label: "Greece", value: "GR" },
];

function HotelsSearch() {
  const dispatch = useDispatch();
  const { hotels, status, error } = useSelector((state) => state.hotels);

  const [searchQuery, setSearchQuery] = useState("");
  const [countryFilter, setCountryFilter] = useState("");

  useEffect(() => {
    dispatch(fetchHotels());
  }, [dispatch]);

  // Apply filters locally
  const filteredHotels = hotels.filter((hotel) => {
    const matchesName = hotel.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesCountry = countryFilter
      ? hotel.address?.countryIsoCode === countryFilter
      : true;
    return matchesName && matchesCountry;
  });
  return (
    <div className="container mt-4">
      <h2>Search Hotels</h2>

      {/* Search Input */}
      <input
        type="text"
        placeholder="Search by hotel name..."
        className="form-control mb-3"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />

      {/* Country Filter */}
      <select
        className="form-select mb-4"
        value={countryFilter}
        onChange={(e) => setCountryFilter(e.target.value)}
      >
        <option value="">All Countries</option>
        {countries.map((country) => (
          <option key={country.value} value={country.value}>
            {country.label}
          </option>
        ))}
      </select>

      {/* Hotels List */}
      {status === "loading" && <Loader/>}
      {status === "failed" && <p>{error}</p>}
      {status === "succeeded" && filteredHotels.length === 0 && (
        <p>No results found.</p>
      )}

      <div className="d-flex flex-wrap gap-3">
        {filteredHotels.map((hotel) => (
          <HotelCard key={hotel.id} hotel={hotel} />
        ))}
      </div>
    </div>
  );
}

export default HotelsSearch;
