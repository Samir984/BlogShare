import { Link } from "react-router-dom";
import dbService from "../services/database";

function BlogCard({ $id, title, featuredImage }) {
  return (
    <Link to={`/post/${$id}`}>
      <div className="max-w-[520px] rounded-xl p-4 max-h-[400px] bg-slate-100  ">
        <div className="w-full justify-center mb-4">
          <img
            src={dbService.getFilePreview(featuredImage)}
            alt={title}
            className="rounded-xl w-full h-80"
          />
        </div>
        <h2 className="text-lg font-medium line-clamp-2">{title}</h2>
      </div>
    </Link>
  );
}
export default BlogCard;
