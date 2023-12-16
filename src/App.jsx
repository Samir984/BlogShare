import { RouterProvider, createBrowserRouter } from "react-router-dom";
import PageNotFound from "./pages/PageNotFound";
import Login from "./pages/Login";

const router = createBrowserRouter([
  {
    path: "/signup",
    element: <Login />,
  },
  {
    path: "/signin",
    element: <Login />,
  },
  {
    path: "*",
    element: <PageNotFound />,
  },

  { path: "", element: "" },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
