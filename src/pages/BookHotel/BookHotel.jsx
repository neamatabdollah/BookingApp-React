import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
// import { useSelector } from "react-redux";
import axios from "../../network/axios";
import Loader from "../../components/Loader/Loader";

function BookHotel() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [hotel, setHotel] = useState(null);
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [cardError, setCardError] = useState("");
  const [formError, setFormError] = useState("");

  const user = JSON.parse(localStorage.getItem("bookingUser"));

  // Fetch hotel by ID
  useEffect(() => {
    const fetchHotel = async () => {
      try {
        const res = await axios.get(`/hotels/${id}`);
        setHotel(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchHotel();
  }, [id]);

  // Calculate nights
  const getNights = () => {
    if (!checkIn || !checkOut) return 0;
    const from = new Date(checkIn);
    const to = new Date(checkOut);
    const diffTime = Math.abs(to - from);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const totalPrice = hotel ? hotel.pricing[0].discountedPrice * getNights() : 0;

  const validateCard = () => {
    const regex = /^[0-9]{16}$/; // Very simple regex
    if (!regex.test(cardNumber)) {
      setCardError("Card number must be 16 digits.");
      return false;
    }
    setCardError("");
    return true;
  };

  const handlePay = () => {
    if (!checkIn || !checkOut || !cardNumber) {
      setFormError("All fields are required.");
      return;
    }

    if (!validateCard()) {
      setFormError("Fix errors before submitting.");
      return;
    }

    const booking = {
      hotelId: id,
      hotelName: hotel.name,
      checkIn,
      checkOut,
      nights: getNights(),
      totalPrice,
    };

    const prevBookings = JSON.parse(localStorage.getItem("myBookings")) || [];
    localStorage.setItem(
      "myBookings",
      JSON.stringify([...prevBookings, booking])
    );

    alert("Booking confirmed! ✅");
    navigate("/my-bookings");
  };

  if (!user) {
    navigate("/login");
    return null;
  }

  return (
    <div className="container mt-4">
      <h2>Book Hotel</h2>

      {hotel ? (
        <>
          <h4>{hotel.name}</h4>
          <p>Price per night: ${hotel.pricing[0].discountedPrice}</p>

          <div className="mb-3">
            <label>Check-in Date:</label>
            <input
              type="date"
              className="form-control"
              value={checkIn}
              onChange={(e) => setCheckIn(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <label>Check-out Date:</label>
            <input
              type="date"
              className="form-control"
              value={checkOut}
              onChange={(e) => setCheckOut(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <label>Card Number:</label>
            <input
              type="text"
              className="form-control"
              value={cardNumber}
              onChange={(e) => setCardNumber(e.target.value)}
              onBlur={validateCard}
            />
            {cardError && <p className="text-danger">{cardError}</p>}
          </div>

          <div className="mb-3">
            <strong>Total Nights: {getNights()}</strong> <br />
            <strong>Total Price: ${totalPrice}</strong>
          </div>

          {formError && <p className="text-danger">{formError}</p>}

          <button className="btn btn-success" onClick={handlePay}>
            Pay Now
          </button>
        </>
      ) : (
        <Loader />
      )}
    </div>
  );
}

export default BookHotel;
