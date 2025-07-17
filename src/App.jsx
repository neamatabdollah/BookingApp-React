import "./App.css";
import { BrowserRouter } from "react-router-dom";
import Layout from "./Layout/Layout";
import AppRoutes from "./routes/AppRoutes";

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <AppRoutes />
      </Layout>
    </BrowserRouter>
  );
}

export default App;
