import { Link } from "react-router-dom";
import dbService from "../services/database";

function BlogCard({ $id, title, featuredImage }) {
  return (
    <Link to={`/post/${$id}`}>
      <div className="group max-w-[520px] rounded-xl p-4 max-h-[400px] bg-slate-100 hover:bg-slate-300 transition-all duration-500 relative">
        <div className="w-full justify-center mb-4 relative">
          <img
            src={dbService.getFilePreview(featuredImage)}
            alt={title}
            className="rounded-xl w-full h-80"
          />
          <p className="absolute font-semibold text-2xl w-fit bg-gray-700 top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] text-white p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
            Read Blog
          </p>
        </div>
        <h2 className="text-lg font-medium line-clamp-2">{title}</h2>
      </div>
    </Link>
  );
}
export default BlogCard;
