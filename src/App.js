import { Outlet, Route, Routes, useNavigate } from "react-router-dom";
import Login from "./Component/Login";
import Registration from "./Component/Registration";
import TabForm from "./Component/TabForm";
import OtpCode from "./Component/OtpCode";
import "react-notifications/lib/notifications.css";
import { useEffect } from "react";

function App() {
  const key = localStorage.getItem("key");
  const navigate = useNavigate();

  useEffect(() => {
    if (key) {
      if (!window.location.pathname.includes("/main")) {
        navigate("/main");
      }
    } else {
      if (window.location.pathname.includes("/main")) {
        navigate("/");
      }
    }
  }, [key, navigate]);

  return (
    <>
      <Routes>
        <Route path="/" element={<Outlet />}>
          <Route index element={<Login />} />
          <Route path="/Registration" element={<Registration />} />
          <Route path="/otp" element={<OtpCode />} />
        </Route>
        <Route path="/main" element={<Outlet />}>
          <Route index element={<TabForm />} />
        </Route>
        <Route path="*" element={<h1>404</h1>} />
      </Routes>
      {/* <RouterProvider router={authRoute} /> */}
    </>
  );
}

export default App;
