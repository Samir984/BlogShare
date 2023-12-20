import { useSelector } from "react-redux";
import { getUserStatus } from "../features/authslice";

function CreateBlog() {
  const { status: userStatus } = useSelector(getUserStatus);
  console.log(userStatus);
  return (
    <div className="p-2 m-4 max-w-6xl mx-auto flex justify-center items-center">
      {userStatus ? (
        <div>
          
        </div>
      ) : (
        <div className="text-2xl text-red-500 font-mono  ">
          Please Login to create your blog.
        </div>
      )}
    </div>
  );
}

export default CreateBlog;
