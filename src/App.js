import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./Component/Login";
import Registration from "./Component/Registration";
import TabForm from "./Component/TabForm";
import OtpCode from "./Component/OtpCode";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/Registration",
    element: <Registration />,
  },
  {
    path: "/otp",
    element: <OtpCode />,
  },
  {
    path: "/tab",
    element: <TabForm />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
