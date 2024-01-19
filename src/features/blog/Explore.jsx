import dbService from "../../services/database";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { PiSmileySadLight } from "react-icons/pi";
import BlogCard from "../../ui/BlogCard";
import { useQuery } from "@tanstack/react-query";

function Explore() {
  const { data: posts, isLoading: isFetching } = useQuery({
    queryKey: ["blogs"],
    queryFn: () => dbService.getAllBlogs([]),
  });
  console.log(posts);
  return (
    <div className="w-full">
      <h2 className="font-large text-2xl  mb-8">CommunityPost:</h2>
      <div className="grid grid-cols-1 gap-3 md:grid-cols-2  mt-4 justify-items-center">
        {isFetching ? (
          <>
            <Skeleton className="min-w-[360px] rounded-xl p-4 min-h-[340px] bg-slate-100" />
            <Skeleton className="min-w-[380px] rounded-xl p-4 min-h-[340px] bg-slate-100" />
            <Skeleton className="min-w-[360px] rounded-xl p-4 min-h-[340px] bg-slate-100" />
            <Skeleton className="min-w-[360px] rounded-xl p-4 min-h-[340px] bg-slate-100" />
          </>
        ) : (
          <>
            {posts.documents.map((post) => (
              <BlogCard {...post} key={post.$id} />
            ))}
            {posts.documents.length === 0 && (
              <div className="flex gap-4 text-2xl items-center w-full justify-center">
                <PiSmileySadLight size={40} className="inline" />
                <span>No post found</span>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default Explore;
