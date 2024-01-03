import { Outlet, Route, Routes, useNavigate } from "react-router-dom";
import Login from "./Component/Login";
import TabForm from "./Component/TabForm";
import OtpCode from "./Component/OtpCode";
import "react-notifications/lib/notifications.css";
import { useEffect, useState } from "react";
import "./App.css";
import Navbar from "./Component/Layout/NavBar/Navbar";
import Report from "./Component/Reaport";
import Sidebar from "./Component/Layout/SideBar/Sidebar";

function App() {
  const key = localStorage.getItem("key");
  const navigate = useNavigate();
  const [sideBar, setSidebar] = useState(true);
  useEffect(() => {
    if (!key) {
      if (window.location.pathname.includes("/report")) {
        navigate("/login");
      }
    }
  }, [key, navigate]);

  return (
    <div className="main-layout">
      {key ? <Sidebar sideBar={sideBar} /> : null}
      <div style={{ width: "100%" }}>
        <Navbar
          sideBar={sideBar}
          onClickMenu={(val) => {
            setSidebar(!sideBar);
          }}
        />
        <div style={{ height: "92vh", overflow: "auto" }}>
          <Routes>
            <Route path="/" element={<Outlet />}>
              <Route path="/login" element={<Login />} />
              {/* <Route path="/Registration" element={<Registration />} /> */}
              <Route path="/otp" element={<OtpCode />} />
              <Route index element={<TabForm />} />
            </Route>
            <Route path="/report" element={<Outlet />}>
              <Route index element={<Report />} />
            </Route>
            <Route path="*" element={<h1>404</h1>} />
          </Routes>
        </div>
        {/* <RouterProvider router={authRoute} /> */}
      </div>
    </div>
  );
}

export default App;
