import { RouterProvider, createBrowserRouter } from "react-router-dom";
import PageNotFound from "./pages/PageNotFound";
import Login from "./pages/Login";
import { Provider, useDispatch } from "react-redux";
import { Toaster } from "react-hot-toast";
import Home from "./pages/Home";
import PostBlog from "./features/blog/PostBlog";
import Explore from "./features/blog/Explore";
import ReadBlog from "./features/blog/ReadBlog";
import EditBlog, { loader as editBlogLoader } from "./features/blog/EditBlog";
import { ThemeProvider } from "./context/ThemeProvider";
import { useEffect } from "react";
import authService from "./services/auth";
import { signIn, signOut } from "./features/authslice";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    children: [
      {
        path: "/",
        element: <Explore />,
      },
      { path: "create", element: <PostBlog /> },
      { path: "post/:id", element: <ReadBlog /> },
      {
        path: "edit/:id",
        element: <EditBlog />,
        loader: editBlogLoader,
      },
    ],
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
  const dispatch = useDispatch();
  useEffect(() => {
    authService.getCurrentUser().then((userData) => {
      if (userData) {
        dispatch(signIn(userData));
      } else {
        dispatch(signOut());
      }
    });
  }, []);

  return (
    <ThemeProvider>
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
    </ThemeProvider>
  );
}

export default App;
