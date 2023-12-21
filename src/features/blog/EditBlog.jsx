import { useLoaderData } from "react-router-dom";
import dbService from "../../services/database";
import PostBlog from "./PostBlog";

function EditBlog() {
  const post = useLoaderData();
  console.log(post);
  return <PostBlog post={post} type='edit' />;
}

export default EditBlog;

export async function loader({ params }) {
  console.log(params.id);
  const post = await dbService.getBlog(params.id);
  console.log(post);
  return post;
}
