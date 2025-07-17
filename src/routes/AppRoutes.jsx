import { Routes, Route } from "react-router-dom";
import HomePage from "../pages/HomePage/HomePage.jsx";
import HotelsSearch from "../pages/HotelsSearch/HotelsSearch.jsx";
import Login from "../pages/Login/Login.jsx";
import MyBookings from "../pages/MyBookings/MyBookings.jsx";
import ProtectedRoute from "./ProtectedRoute.jsx";

const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<HomePage />} />
    <Route path="/hotels" element={<HotelsSearch />} />
    <Route path="/login" element={<Login />} />
    <Route
      path="/my-bookings"
      element={
        <ProtectedRoute>
          <MyBookings />
        </ProtectedRoute>
      }
    />
  </Routes>
);

export default AppRoutes;
