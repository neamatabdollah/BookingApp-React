import React from "react";
import { useNavigate } from "react-router-dom";

function MyBookings() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("bookingUser"));
  if (!user) {
    navigate("/login");
    return null;
  }

  const bookings = JSON.parse(localStorage.getItem("myBookings")) || [];
  const totalPaid = bookings.reduce((sum, b) => sum + b.totalPrice, 0);

  return (
    <div className="container mt-4">
      <h2>My Bookings</h2>
      {bookings.length === 0 ? (
        <p>You have no bookings yet.</p>
      ) : (
        <>
          <table className="table table-striped">
            <thead>
              <tr>
                <th>Hotel</th>
                <th>Check-in</th>
                <th>Check-out</th>
                <th>Nights</th>
                <th>Total Price</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((b, index) => (
                <tr key={index}>
                  <td>{b.hotelName}</td>
                  <td>{b.checkIn}</td>
                  <td>{b.checkOut}</td>
                  <td>{b.nights}</td>
                  <td>${b.totalPrice}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <p>
            <strong>Total Paid:</strong> ${totalPaid}
          </p>
        </>
      )}
    </div>
  );
}

export default MyBookings;
