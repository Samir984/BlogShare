import dbService from "../../services/database";
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
      {isFetching ? (
        "Loading..."
      ) : (
        <>
          <h2 className="font-large text-2xl ">CommunityPost:</h2>
          <div className="grid grid-cols-1 gap-3 md:grid-cols-2  mt-4 justify-items-center">
            {posts.documents.map((post) => (
              <BlogCard {...post} key={post.$id} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default Explore;
