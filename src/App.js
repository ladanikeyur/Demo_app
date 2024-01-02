import { Outlet, Route, Routes, useNavigate } from "react-router-dom";
import Login from "./Component/Login";
import Registration from "./Component/Registration";
import TabForm from "./Component/TabForm";
import OtpCode from "./Component/OtpCode";
import "react-notifications/lib/notifications.css";
import { useEffect } from "react";
import "./App.css";
import Navbar from "./Component/Layout/Navbar";
import Report from "./Component/Reaport";

function App() {
  const key = localStorage.getItem("key");
  const navigate = useNavigate();

  useEffect(() => {
    if (!key) {
      if (window.location.pathname.includes("/report")) {
        navigate("/login");
      }
    }
  }, [key, navigate]);

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Outlet />}>
          <Route path="/login" element={<Login />} />
          <Route path="/Registration" element={<Registration />} />
          <Route path="/otp" element={<OtpCode />} />
          <Route index element={<TabForm />} />
        </Route>
        <Route path="/report" element={<Outlet />}>
          <Route index element={<Report />} />
        </Route>
        <Route path="*" element={<h1>404</h1>} />
      </Routes>
      {/* <RouterProvider router={authRoute} /> */}
    </>
  );
}

export default App;
