import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";
import Sidebar from "../components/Sidebar/Sidebar";
import { Outlet } from "react-router-dom";

const Layout = () => (
  <>
    <Navbar />
    <div className="d-flex">
      <Sidebar />
      <div className="flex-grow-1 p-4">
        <Outlet />
      </div>
    </div>{" "}
    <Footer />
  </>
);

export default Layout;
