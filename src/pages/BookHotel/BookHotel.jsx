import React from "react";
import { useParams } from "react-router-dom";

function BookHotel() {
  const { id } = useParams();

  return (
    <div className="container mt-4">
      <h2>Book Hotel</h2>
      <p>Hotel ID: {id}</p>

      <p></p>
    </div>
  );
}

export default BookHotel;
