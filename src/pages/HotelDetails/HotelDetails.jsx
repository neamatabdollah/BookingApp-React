import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "../../network/axios";
import { useNavigate } from "react-router-dom";

function HotelDetails() {
  const navigate = useNavigate();

  const handlePay = () => {
    navigate(`/book-hotel/${id}`);
  };
  const { id } = useParams();
  const [hotel, setHotel] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchHotel = async () => {
      try {
        const response = await axios.get(`/hotels/${id}`);
        setHotel(response.data);
      } catch (err) {
        setError(err.message || "Hotel not found");
      } finally {
        setLoading(false);
      }
    };

    fetchHotel();
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;
  if (!hotel) return null;

  return (
    <div className="container mt-4">
      <h2>{hotel.name}</h2>
      <img
        src={hotel?.images?.main}
        alt={hotel.name}
        style={{ maxWidth: "600px", width: "100%" }}
      />
      <p>{hotel.description}</p>
      <p>
        <strong>Address:</strong> {hotel.address?.street}, {hotel.address?.city}
        , {hotel.address?.country}
      </p>
      <p>
        <strong>Price:</strong> {hotel.pricing?.[0]?.discountedPrice}{" "}
        {hotel.pricing?.[0]?.currency} ({hotel.pricing?.[0]?.priceUnit})
      </p>

      <button className="btn btn-success" onClick={handlePay}>Pay Now</button>
    </div>
  );
}

export default HotelDetails;
