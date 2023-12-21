import { useEffect, useState } from "react";
import dbService from "../../services/database";
import BlogCard from "../../ui/BlogCard";

function Explore() {
  const [isLoading, setIsLoading] = useState(false);
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    dbService.getAllPosts([]).then((posts) => {
      if (posts) {
        setPosts(posts.documents);
      }
    });
  }, []);
  console.log(posts);
  return (
    <div className="w-full">
      <h2 className="font-large text-2xl ">CommunityPost:</h2>
      <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3 mt-4 justify-items-center">
        {posts.map((post) => (
          <BlogCard {...post} key={post.$id} />
        ))}
      </div>
    </div>
  );
}

export default Explore;
