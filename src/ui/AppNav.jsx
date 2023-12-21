import { useState } from "react";
import dbService from "../services/database";
import toast from "react-hot-toast";
import { useNavigate, useNavigation } from "react-router-dom";

function AppNav({ post }) {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const navigation = useNavigation();
  console.log(navigation.state);
  const handeleDeleteBlog = function () {
    setIsLoading(true);
    Promise.all([
      dbService.deleteBlog(post.$id),
      dbService.deleteFile(post.featuredImage),
    ]).then((res) => {
      toast.success("Delete successfully");
      navigate("/");
    });
  };

  const handleEditBlog = function () {
    navigate(`/edit/${post.$id}`);
  };
  return (
    <div className="mb-8 flex gap-4">
      <button
        className="px-4 py-2 text-white bg-red-700 hover:bg-red-800"
        onClick={handeleDeleteBlog}
      >
        {isLoading ? "Deleting..." : "Delete"}
      </button>
      <button
        className="px-4 py-2 text-white  bg-blue-700 hover:bg-blue-700"
        onClick={handleEditBlog}
      >
        {navigation.state === "loading" ? (
          <span className="loader"></span>
        ) : (
          "Edit"
        )}
      </button>
    </div>
  );
}
export default AppNav;
