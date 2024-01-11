import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { useParams } from "react-router-dom";
import dbService from "../../services/database";
import { useSelector } from "react-redux";
import { getUserStatus } from "../authslice";
import AppNav from "../../ui/AppNav";
import { useQuery } from "@tanstack/react-query";

function ReadBlog() {
  const { id } = useParams();
  const { userData } = useSelector(getUserStatus);
  const { isLoading: isFetching, data: post } = useQuery({
    queryKey: [`blogId-${id}`],
    queryFn: () => dbService.getBlog(id),
  });

  return (
    <div className="w-full ">
      {isFetching && <Skeleton className="min-h-[800px]" />}
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
