import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./Layout/Layout";
import AppRoutes from "./routes/AppRoutes";
import HomePage from "./pages/HomePage/HomePage";
import HotelsSearch from "./pages/HotelsSearch/HotelsSearch";
import Login from "./pages/Login/Login";
import MyBookings from "./pages/MyBookings/MyBookings";
import ProtectedRoute from "./routes/ProtectedRoute";
import HotelDetails from "./pages/HotelDetails/HotelDetails";

function App() {
  return (
    <BrowserRouter>
      {/* <Layout>
        <AppRoutes />
      </Layout> */}
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="hotels" element={<HotelsSearch />} />
          <Route path="login" element={<Login />} />
          <Route path="/hotels/:id" element={<HotelDetails />} />
          <Route
            path="my-bookings"
            element={
              <ProtectedRoute>
                <MyBookings />
              </ProtectedRoute>
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
