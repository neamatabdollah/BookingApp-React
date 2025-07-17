import React from "react";
import { useNavigate } from "react-router-dom";

function HotelCard({ hotel }) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/hotels/${hotel.id}`);
  };

  return (
    <div
      className="card mb-3"
      style={{ maxWidth: "300px", cursor: "pointer" }}
      onClick={handleClick}
    >
      <img
        src={hotel?.images?.main || hotel?.image}
        className="card-img-top"
        alt={hotel.name}
        style={{ height: "200px", objectFit: "cover" }}
      />
      <div className="card-body">
        <h5 className="card-title">{hotel?.name}</h5>
        <p className="card-text">
          {hotel?.description?.substring(0, 30) || ""}
        </p>
        <p className="card-text">
          <small className="text-muted">
            {hotel?.address?.street && hotel?.address?.city
              ? `${hotel.address.street} - ${hotel.address.city}`
              : hotel?.location}
          </small>
        </p>
      </div>
    </div>
  );
}

export default HotelCard;
