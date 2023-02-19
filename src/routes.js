import { useRoutes } from "react-router-dom";

// Routes

import MainLayout from "./layout/MainLayout";
import Groceries from "./pages/Groceries";
import Checkout from "./pages/Checkout";

// -------------------------------------------------------------

export default function Router() {
  return useRoutes([
    {
      path: "/",
      element: <MainLayout />,
      children: [
        { path: "", element: <Groceries /> },
        { path: "checkout", element: <Checkout /> },
      ],
    },
  ]);
}
