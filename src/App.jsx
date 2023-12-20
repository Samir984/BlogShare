import { RouterProvider, createBrowserRouter } from "react-router-dom";
import PageNotFound from "./pages/PageNotFound";
import Login from "./pages/Login";
import { Provider } from "react-redux";
import store from "./store/store";
import { Toaster } from "react-hot-toast";
import Home from "./pages/Home";
import CreatePost from "./ui/CreateBlog";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    children: [{ path: "create", element: <CreatePost /> }],
  },
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
]);

function App() {
  return (
    <Provider store={store}>
      <RouterProvider router={router} />
      <Toaster
        position="top-center"
        gutter={12}
        toastOptions={{
          success: { duration: 3000 },
          error: { duration: 4000 },
          className: "max-w-md px-2 py-1 bg-gray-50 text-gray-700",
        }}
      />
    </Provider>
  );
}

export default App;
