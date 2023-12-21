import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import dbService from "../../services/database";
import { useSelector } from "react-redux";
import { getUserStatus } from "../authslice";
import AppNav from "../../ui/AppNav";

function ReadBlog() {
  const { id } = useParams();
  const { userData } = useSelector(getUserStatus);
  const [post, setPost] = useState(null);
  useEffect(() => {
    dbService.getBlog(id).then((post) => {
      if (post) {
        setPost(post);
        console.log(post, userData);
      }
    });
  }, []);

  return (
    <div className="w-full ">
      {post && (
        <div className="">
          {userData?.$id === post.userId ? <AppNav post={post} /> : ""}
          <img
            src={dbService.getFilePreview(post.featuredImage)}
            alt={"image"}
            className="rounded-xl w-full "
          />
          <h1 className="text-3xl uppercase mt-5 text-center">{post.title}</h1>

          <p className="text-2xl mt-10">{post.content}</p>
        </div>
      )}
    </div>
  );
}

export default ReadBlog;
