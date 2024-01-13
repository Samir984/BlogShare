import { useState } from "react";
import dbService from "../services/database";
import toast from "react-hot-toast";
import { useNavigate, useNavigation } from "react-router-dom";
import { AiOutlineDelete } from "react-icons/ai";
import { FaEdit } from "react-icons/fa";
function AppNav({ post }) {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const navigation = useNavigation();
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
    <div className="mb-8 flex flex-row-reverse gap-4">
      <button
        className="px-4 py-2 text-white  border-4 bg-green-700 hover:bg-green-800"
        onClick={handleEditBlog}
      >
        {navigation.state === "loading" ? (
          <span className="loader"></span>
        ) : (
        <FaEdit size={24}/>
        )}
      </button>
      <button
        className="px-4 py-2 text-white border-4 bg-red-700 hover:bg-red-800"
        onClick={handeleDeleteBlog}
      >
        {isLoading ? "Deleting..." : <AiOutlineDelete size={24} />}
      </button>
    </div>
  );
}
export default AppNav;
