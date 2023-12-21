import { useEffect, useState } from "react";
import dbService from "../../services/database";
import BlogCard from "../../ui/BlogCard";
import { useNavigation } from "react-router-dom";

function Explore() {
  const [isLoading, setIsLoading] = useState(false);
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    setIsLoading(true);
    dbService.getAllBlogs([]).then((posts) => {
      if (posts) {
        setPosts(posts.documents);
        setIsLoading(false);
      }
    });
  }, []);
  console.log(posts);
  return (
    <div className="w-full">
      {isLoading ? (
        "Loading..."
      ) : posts.length > 0 ? (
        <>
          <h2 className="font-large text-2xl ">CommunityPost:</h2>
          <div className="grid grid-cols-1 gap-3 md:grid-cols-2  mt-4 justify-items-center">
            {posts.map((post) => (
              <BlogCard {...post} key={post.$id} />
            ))}
          </div>
        </>
      ) : (
        "No posts are found"
      )}
    </div>
  );
}

export default Explore;
